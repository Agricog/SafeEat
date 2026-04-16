import { useState, useEffect, useMemo } from 'react'
import { ALLERGENS, getIdsFromMask } from '../../lib/allergens'
import { useApi } from '../../lib/api'
import { useVenue } from '../../lib/VenueContext'

interface Dish {
  id: string
  name: string
  allergenMask: number
  mayContainMask: number
  active: boolean
}

interface Question {
  dishName: string
  allergenLabel: string
  allergenIcon: string
  correctAnswer: 'yes' | 'no' | 'may-contain'
  type: 'contains' | 'safe-for'
}

interface QuizResult {
  id: number
  staff_name: string
  score: number
  total_questions: number
  completed_at: string
}

const QUESTIONS_PER_QUIZ = 10

function generateQuestions(dishes: Dish[]): Question[] {
  if (dishes.length === 0) return []

  const questions: Question[] = []
  const used = new Set<string>()

  // Build pool of possible questions
  const pool: Question[] = []
  for (const dish of dishes) {
    const containsIds = new Set(getIdsFromMask(dish.allergenMask))
    const mayContainIds = new Set(getIdsFromMask(dish.mayContainMask))

    for (const allergen of ALLERGENS) {
      const contains = containsIds.has(allergen.id)
      const mayContain = mayContainIds.has(allergen.id)

      // "Does X contain Y?" questions
      pool.push({
        dishName: dish.name,
        allergenLabel: allergen.shortLabel,
        allergenIcon: allergen.icon,
        correctAnswer: contains ? 'yes' : mayContain ? 'may-contain' : 'no',
        type: 'contains',
      })

      // "Is X safe for someone with Y allergy?" questions (inverted logic)
      pool.push({
        dishName: dish.name,
        allergenLabel: allergen.shortLabel,
        allergenIcon: allergen.icon,
        correctAnswer: contains ? 'no' : mayContain ? 'no' : 'yes',
        type: 'safe-for',
      })
    }
  }

  // Shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  // Pick questions ensuring variety: mix of yes/no answers and question types
  let yesCount = 0
  let noCount = 0

  for (const q of pool) {
    if (questions.length >= QUESTIONS_PER_QUIZ) break
    const key = `${q.dishName}-${q.allergenLabel}-${q.type}`
    if (used.has(key)) continue

    // Balance yes/no answers roughly
    const isYes = q.correctAnswer === 'yes'
    const isNo = q.correctAnswer === 'no' || q.correctAnswer === 'may-contain'
    if (isYes && yesCount >= Math.ceil(QUESTIONS_PER_QUIZ * 0.6)) continue
    if (isNo && noCount >= Math.ceil(QUESTIONS_PER_QUIZ * 0.6)) continue

    used.add(key)
    questions.push(q)
    if (isYes) yesCount++
    if (isNo) noCount++
  }

  return questions
}

export default function StaffQuiz() {
  const { request } = useApi()
  const { venueId } = useVenue()
  const [dishes, setDishes] = useState<Dish[]>([])
  const [results, setResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Quiz state
  const [staffName, setStaffName] = useState('')
  const [phase, setPhase] = useState<'history' | 'name' | 'quiz' | 'results'>('history')
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<(string | null)[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      request<{ dishes: any[] }>(`/api/dashboard/${venueId}/dishes`),
      request<{ results: QuizResult[] }>(`/api/dashboard/${venueId}/quiz-results`),
    ])
      .then(([dishData, resultData]) => {
        if (cancelled) return
        setDishes(
          dishData.dishes
            .filter((d: any) => d.active)
            .map((d: any) => ({
              id: d.id,
              name: d.name,
              allergenMask: d.allergen_mask,
              mayContainMask: d.may_contain_mask || 0,
              active: d.active,
            }))
        )
        setResults(resultData.results)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [request, venueId])

  const startQuiz = () => {
    if (!staffName.trim()) {
      setError('Please enter the staff member\'s name')
      return
    }
    setError(null)
    const qs = generateQuestions(dishes)
    if (qs.length === 0) {
      setError('Not enough dishes with allergen data to generate a quiz. Add dishes with allergens first.')
      return
    }
    setQuestions(qs)
    setAnswers(new Array(qs.length).fill(null))
    setCurrentIndex(0)
    setShowFeedback(false)
    setPhase('quiz')
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers]
    newAnswers[currentIndex] = answer
    setAnswers(newAnswers)
    setShowFeedback(true)
  }

  const nextQuestion = () => {
    setShowFeedback(false)
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      finishQuiz()
    }
  }

  const finishQuiz = async () => {
    const score = questions.reduce((acc, q, i) => {
      const a = answers[i]
      if (q.type === 'contains') {
        if (q.correctAnswer === 'yes' && a === 'yes') return acc + 1
        if (q.correctAnswer === 'no' && a === 'no') return acc + 1
        if (q.correctAnswer === 'may-contain' && a === 'may-contain') return acc + 1
      } else {
        if (q.correctAnswer === 'yes' && a === 'yes') return acc + 1
        if (q.correctAnswer === 'no' && a === 'no') return acc + 1
      }
      return acc
    }, 0)

    setPhase('results')
    setSaving(true)
    try {
      const res = await request<{ result: QuizResult }>(`/api/dashboard/${venueId}/quiz-results`, {
        method: 'POST',
        body: {
          staffName: staffName.trim(),
          score,
          totalQuestions: questions.length,
        },
      })
      setResults([res.result, ...results])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const score = useMemo(() => {
    return questions.reduce((acc, q, i) => {
      const a = answers[i]
      if (q.type === 'contains') {
        if (q.correctAnswer === 'yes' && a === 'yes') return acc + 1
        if (q.correctAnswer === 'no' && a === 'no') return acc + 1
        if (q.correctAnswer === 'may-contain' && a === 'may-contain') return acc + 1
      } else {
        if (q.correctAnswer === 'yes' && a === 'yes') return acc + 1
        if (q.correctAnswer === 'no' && a === 'no') return acc + 1
      }
      return acc
    }, 0)
  }, [questions, answers])

  const currentQ = questions[currentIndex]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-se-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  // ── RESULTS SCREEN ──
  if (phase === 'results') {
    const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0
    const passed = pct >= 80
    return (
      <div>
        <div className="text-center py-8">
          <div className="text-5xl mb-4">{passed ? '🎉' : '📚'}</div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            {staffName} — {score}/{questions.length} ({pct}%)
          </h2>
          <p className={`text-sm font-medium ${passed ? 'text-se-green-600' : 'text-amber-600'}`}>
            {passed ? 'Passed' : 'Needs review — retake recommended'}
          </p>
          {saving && <p className="text-xs text-gray-400 mt-2">Saving result...</p>}
        </div>

        {/* Question review */}
        <div className="space-y-2 mb-6">
          {questions.map((q, i) => {
            const userAnswer = answers[i]
            let correct = false
            if (q.type === 'contains') {
              correct = userAnswer === q.correctAnswer
            } else {
              correct = userAnswer === q.correctAnswer
            }
            return (
              <div key={i} className={`px-4 py-3 rounded-lg border text-sm ${correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <p className="font-medium text-gray-900">
                  {q.type === 'contains'
                    ? `Does ${q.dishName} contain ${q.allergenIcon} ${q.allergenLabel}?`
                    : `Is ${q.dishName} safe for a ${q.allergenIcon} ${q.allergenLabel} allergy?`}
                </p>
                <p className="text-xs mt-1">
                  <span className={correct ? 'text-green-700' : 'text-red-700'}>
                    Your answer: {userAnswer} {correct ? '✓' : '✗'}
                  </span>
                  {!correct && (
                    <span className="text-gray-500 ml-2">
                      Correct: {q.correctAnswer}
                    </span>
                  )}
                </p>
              </div>
            )
          })}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => { setPhase('name'); setStaffName(''); }}
            className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
          >
            New quiz
          </button>
          <button
            onClick={() => setPhase('history')}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            View history
          </button>
        </div>
      </div>
    )
  }

  // ── QUIZ SCREEN ──
  if (phase === 'quiz' && currentQ) {
    const questionText = currentQ.type === 'contains'
      ? `Does "${currentQ.dishName}" contain ${currentQ.allergenIcon} ${currentQ.allergenLabel}?`
      : `Is "${currentQ.dishName}" safe for someone with a ${currentQ.allergenIcon} ${currentQ.allergenLabel} allergy?`

    const userAnswer = answers[currentIndex]
    let isCorrect = false
    if (userAnswer !== null) {
      isCorrect = userAnswer === currentQ.correctAnswer
    }

    const showMayContain = currentQ.type === 'contains'

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Staff Quiz</h2>
            <p className="text-sm text-gray-500">{staffName}</p>
          </div>
          <span className="text-sm font-medium text-gray-500">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6">
          <div
            className="h-full bg-se-green-600 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <p className="text-lg font-semibold text-gray-900 mb-6">{questionText}</p>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => !showFeedback && handleAnswer('yes')}
              disabled={showFeedback}
              className={`w-full px-4 py-3 rounded-lg text-sm font-medium border transition-colors text-left ${
                showFeedback && userAnswer === 'yes'
                  ? isCorrect
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : 'bg-red-50 border-red-300 text-red-800'
                  : showFeedback && currentQ.correctAnswer === 'yes'
                  ? 'bg-green-50 border-green-300 text-green-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              Yes
            </button>
            {showMayContain && (
              <button
                onClick={() => !showFeedback && handleAnswer('may-contain')}
                disabled={showFeedback}
                className={`w-full px-4 py-3 rounded-lg text-sm font-medium border transition-colors text-left ${
                  showFeedback && userAnswer === 'may-contain'
                    ? isCorrect
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-red-50 border-red-300 text-red-800'
                    : showFeedback && currentQ.correctAnswer === 'may-contain'
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                May contain (cross-contamination)
              </button>
            )}
            <button
              onClick={() => !showFeedback && handleAnswer('no')}
              disabled={showFeedback}
              className={`w-full px-4 py-3 rounded-lg text-sm font-medium border transition-colors text-left ${
                showFeedback && userAnswer === 'no'
                  ? isCorrect
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : 'bg-red-50 border-red-300 text-red-800'
                  : showFeedback && currentQ.correctAnswer === 'no'
                  ? 'bg-green-50 border-green-300 text-green-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              No
            </button>
          </div>

          {showFeedback && (
            <div className="mt-4 flex items-center justify-between">
              <p className={`text-sm font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {isCorrect ? '✓ Correct!' : `✗ The answer is: ${currentQ.correctAnswer}`}
              </p>
              <button
                onClick={nextQuestion}
                className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
              >
                {currentIndex < questions.length - 1 ? 'Next' : 'See results'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── NAME ENTRY SCREEN ──
  if (phase === 'name') {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Staff Quiz</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {QUESTIONS_PER_QUIZ} questions auto-generated from your menu
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">Staff member name</label>
          <input
            type="text"
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            placeholder="e.g. Sarah, Chef Mike"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 mb-4"
            onKeyDown={(e) => e.key === 'Enter' && startQuiz()}
            autoFocus
          />
          <button
            onClick={startQuiz}
            className="w-full py-2.5 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
          >
            Start quiz
          </button>
        </div>

        <button
          onClick={() => setPhase('history')}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back to history
        </button>
      </div>
    )
  }

  // ── HISTORY SCREEN (default) ──
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Staff Quiz</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Auto-generated allergen questions from your menu
          </p>
        </div>
        <button
          onClick={() => { setPhase('name'); setError(null) }}
          className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
        >
          + New quiz
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {dishes.length < 2 && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-700">
          Add at least 2 dishes with allergen data to generate quiz questions.
        </div>
      )}

      {results.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-3xl mb-3">✏️</div>
          <p className="text-sm text-gray-500">No quiz results yet.</p>
          <p className="text-xs text-gray-400 mt-1">
            Run a quiz to test staff knowledge of your menu's allergens.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {results.map((r) => {
            const pct = Math.round((r.score / r.total_questions) * 100)
            const passed = pct >= 80
            return (
              <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{r.staff_name}</h4>
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${
                      passed
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {passed ? 'Passed' : 'Needs review'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {r.score}/{r.total_questions} ({pct}%) &middot;{' '}
                    {new Date(r.completed_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-bold"
                  style={{
                    borderColor: passed ? '#16a34a' : '#d97706',
                    color: passed ? '#16a34a' : '#d97706',
                  }}
                >
                  {pct}%
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* EHO footer */}
      <div className="mt-6 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500">
          Quiz questions are generated from your live menu data. Results are logged with staff name and date
          to demonstrate allergen training compliance during EHO inspections. Pass mark: 80%.
        </p>
      </div>
    </div>
  )
}
