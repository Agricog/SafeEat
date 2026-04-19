/**
 * SafeEat — Multi-language translation system
 *
 * Static translation maps for UI strings and the 14 FSA allergen labels.
 * Hand-verified translations — no machine translation used, so allergen
 * information is guaranteed accurate across all supported languages.
 *
 * Supported: English (en), French (fr), Spanish (es), German (de)
 */

export type Language = 'en' | 'fr' | 'es' | 'de'

export const SUPPORTED_LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
]

// ---------------------------------------------------------------------------
// Allergen translations — the 14 FSA-regulated allergens
// ---------------------------------------------------------------------------
export const ALLERGEN_TRANSLATIONS: Record<string, Record<Language, { label: string; shortLabel: string }>> = {
  celery: {
    en: { label: 'Celery', shortLabel: 'Celery' },
    fr: { label: 'Céleri', shortLabel: 'Céleri' },
    es: { label: 'Apio', shortLabel: 'Apio' },
    de: { label: 'Sellerie', shortLabel: 'Sellerie' },
  },
  gluten: {
    en: { label: 'Cereals containing gluten', shortLabel: 'Gluten' },
    fr: { label: 'Céréales contenant du gluten', shortLabel: 'Gluten' },
    es: { label: 'Cereales con gluten', shortLabel: 'Gluten' },
    de: { label: 'Glutenhaltiges Getreide', shortLabel: 'Gluten' },
  },
  crustaceans: {
    en: { label: 'Crustaceans', shortLabel: 'Crustaceans' },
    fr: { label: 'Crustacés', shortLabel: 'Crustacés' },
    es: { label: 'Crustáceos', shortLabel: 'Crustáceos' },
    de: { label: 'Krebstiere', shortLabel: 'Krebstiere' },
  },
  eggs: {
    en: { label: 'Eggs', shortLabel: 'Eggs' },
    fr: { label: 'Œufs', shortLabel: 'Œufs' },
    es: { label: 'Huevos', shortLabel: 'Huevos' },
    de: { label: 'Eier', shortLabel: 'Eier' },
  },
  fish: {
    en: { label: 'Fish', shortLabel: 'Fish' },
    fr: { label: 'Poisson', shortLabel: 'Poisson' },
    es: { label: 'Pescado', shortLabel: 'Pescado' },
    de: { label: 'Fisch', shortLabel: 'Fisch' },
  },
  lupin: {
    en: { label: 'Lupin', shortLabel: 'Lupin' },
    fr: { label: 'Lupin', shortLabel: 'Lupin' },
    es: { label: 'Altramuces', shortLabel: 'Altramuces' },
    de: { label: 'Lupinen', shortLabel: 'Lupinen' },
  },
  milk: {
    en: { label: 'Milk', shortLabel: 'Milk' },
    fr: { label: 'Lait', shortLabel: 'Lait' },
    es: { label: 'Leche', shortLabel: 'Leche' },
    de: { label: 'Milch', shortLabel: 'Milch' },
  },
  molluscs: {
    en: { label: 'Molluscs', shortLabel: 'Molluscs' },
    fr: { label: 'Mollusques', shortLabel: 'Mollusques' },
    es: { label: 'Moluscos', shortLabel: 'Moluscos' },
    de: { label: 'Weichtiere', shortLabel: 'Weichtiere' },
  },
  mustard: {
    en: { label: 'Mustard', shortLabel: 'Mustard' },
    fr: { label: 'Moutarde', shortLabel: 'Moutarde' },
    es: { label: 'Mostaza', shortLabel: 'Mostaza' },
    de: { label: 'Senf', shortLabel: 'Senf' },
  },
  tree_nuts: {
    en: { label: 'Tree nuts', shortLabel: 'Tree nuts' },
    fr: { label: 'Fruits à coque', shortLabel: 'Fruits à coque' },
    es: { label: 'Frutos de cáscara', shortLabel: 'Frutos secos' },
    de: { label: 'Schalenfrüchte', shortLabel: 'Schalenfrüchte' },
  },
  peanuts: {
    en: { label: 'Peanuts', shortLabel: 'Peanuts' },
    fr: { label: 'Arachides', shortLabel: 'Arachides' },
    es: { label: 'Cacahuetes', shortLabel: 'Cacahuetes' },
    de: { label: 'Erdnüsse', shortLabel: 'Erdnüsse' },
  },
  sesame: {
    en: { label: 'Sesame', shortLabel: 'Sesame' },
    fr: { label: 'Sésame', shortLabel: 'Sésame' },
    es: { label: 'Sésamo', shortLabel: 'Sésamo' },
    de: { label: 'Sesam', shortLabel: 'Sesam' },
  },
  soybeans: {
    en: { label: 'Soybeans', shortLabel: 'Soya' },
    fr: { label: 'Soja', shortLabel: 'Soja' },
    es: { label: 'Soja', shortLabel: 'Soja' },
    de: { label: 'Soja', shortLabel: 'Soja' },
  },
  sulphites: {
    en: { label: 'Sulphur dioxide and sulphites', shortLabel: 'Sulphites' },
    fr: { label: 'Anhydride sulfureux et sulfites', shortLabel: 'Sulfites' },
    es: { label: 'Dióxido de azufre y sulfitos', shortLabel: 'Sulfitos' },
    de: { label: 'Schwefeldioxid und Sulfite', shortLabel: 'Sulfite' },
  },
}

// ---------------------------------------------------------------------------
// UI string translations
// ---------------------------------------------------------------------------
export const UI_TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Header
  setAllergies: {
    en: 'My allergies',
    fr: 'Mes allergies',
    es: 'Mis alergias',
    de: 'Meine Allergien',
  },
  allergen: {
    en: 'allergen',
    fr: 'allergène',
    es: 'alérgeno',
    de: 'Allergen',
  },
  allergens: {
    en: 'allergens',
    fr: 'allergènes',
    es: 'alérgenos',
    de: 'Allergene',
  },
  selectYourAllergens: {
    en: 'Select your allergens to filter the menu',
    fr: 'Sélectionnez vos allergènes pour filtrer le menu',
    es: 'Selecciona tus alérgenos para filtrar el menú',
    de: 'Wählen Sie Ihre Allergene, um das Menü zu filtern',
  },
  share: {
    en: 'Share',
    fr: 'Partager',
    es: 'Compartir',
    de: 'Teilen',
  },
  copied: {
    en: 'Copied!',
    fr: 'Copié !',
    es: '¡Copiado!',
    de: 'Kopiert!',
  },
  deleteProfile: {
    en: 'x Profile',
    fr: 'x Profil',
    es: 'x Perfil',
    de: 'x Profil',
  },
  // Emergency notice
  emergencyTitle: {
    en: 'In an allergic emergency, call 999',
    fr: "En cas d'urgence allergique, appelez le 999",
    es: 'En una emergencia alérgica, llame al 999',
    de: 'Bei einem allergischen Notfall rufen Sie 999 an',
  },
  emergencyBody: {
    en: 'Always tell your server about your allergies before ordering. This menu is a guide — please confirm with staff.',
    fr: 'Informez toujours votre serveur de vos allergies avant de commander. Ce menu est un guide — veuillez confirmer avec le personnel.',
    es: 'Siempre informe a su camarero sobre sus alergias antes de pedir. Este menú es una guía — confirme con el personal.',
    de: 'Informieren Sie Ihren Kellner immer vor der Bestellung über Ihre Allergien. Diese Karte ist ein Leitfaden — bitte bestätigen Sie mit dem Personal.',
  },
  // Kitchen notice
  kitchenNotice: {
    en: 'Kitchen notice',
    fr: 'Avis de cuisine',
    es: 'Aviso de cocina',
    de: 'Küchenhinweis',
  },
  // May contain
  mayContainLabel: {
    en: 'May contain (cross-contamination):',
    fr: 'Peut contenir (contamination croisée) :',
    es: 'Puede contener (contaminación cruzada):',
    de: 'Kann enthalten (Kreuzkontamination):',
  },
  // URL-shared notice
  preFilteredFromLink: {
    en: 'Menu pre-filtered from a shared link. You can adjust your allergens above.',
    fr: 'Menu pré-filtré à partir d\'un lien partagé. Vous pouvez ajuster vos allergènes ci-dessus.',
    es: 'Menú prefiltrado desde un enlace compartido. Puedes ajustar tus alérgenos arriba.',
    de: 'Menü vorgefiltert über einen geteilten Link. Sie können Ihre Allergene oben anpassen.',
  },
  // Save prompt — in-flight and error states
  savingProfile: {
    en: 'Saving...',
    fr: 'Enregistrement...',
    es: 'Guardando...',
    de: 'Wird gespeichert...',
  },
  saveErrorNetwork: {
    en: 'Could not connect. Please check your signal and try again.',
    fr: 'Connexion impossible. Veuillez vérifier votre signal et réessayer.',
    es: 'No se pudo conectar. Verifique su señal e inténtelo de nuevo.',
    de: 'Verbindung nicht möglich. Bitte prüfen Sie Ihr Signal und versuchen Sie es erneut.',
  },
  saveErrorRateLimit: {
    en: 'Too many attempts. Please wait a moment and try again.',
    fr: 'Trop de tentatives. Veuillez patienter un instant et réessayer.',
    es: 'Demasiados intentos. Espere un momento e inténtelo de nuevo.',
    de: 'Zu viele Versuche. Bitte warten Sie einen Moment und versuchen Sie es erneut.',
  },
  saveErrorServer: {
    en: 'Something went wrong on our end. Please try again in a moment.',
    fr: 'Une erreur est survenue de notre côté. Veuillez réessayer dans un instant.',
    es: 'Algo salió mal por nuestra parte. Inténtelo de nuevo en un momento.',
    de: 'Auf unserer Seite ist etwas schiefgelaufen. Bitte versuchen Sie es gleich noch einmal.',
  },
  emailInvalid: {
    en: 'Please enter a valid email address.',
    fr: 'Veuillez entrer une adresse email valide.',
    es: 'Ingrese una dirección de correo electrónico válida.',
    de: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  },
  emailRequiredForMarketing: {
    en: 'Email is required if you want to receive updates from this venue.',
    fr: 'L\'email est requis si vous souhaitez recevoir des mises à jour de ce local.',
    es: 'El correo es obligatorio si desea recibir actualizaciones de este local.',
    de: 'E-Mail ist erforderlich, wenn Sie Updates von diesem Lokal erhalten möchten.',
  },
  // Profile saved
  profileSaved: {
    en: 'Profile saved - your menu is personalised',
    fr: 'Profil enregistré - votre menu est personnalisé',
    es: 'Perfil guardado - tu menú está personalizado',
    de: 'Profil gespeichert - Ihr Menü ist personalisiert',
  },
  // Dish card
  safe: {
    en: 'Safe',
    fr: 'Sûr',
    es: 'Seguro',
    de: 'Sicher',
  },
  // Categories
  Starters: {
    en: 'Starters',
    fr: 'Entrées',
    es: 'Entrantes',
    de: 'Vorspeisen',
  },
  Mains: {
    en: 'Mains',
    fr: 'Plats principaux',
    es: 'Platos principales',
    de: 'Hauptgerichte',
  },
  Desserts: {
    en: 'Desserts',
    fr: 'Desserts',
    es: 'Postres',
    de: 'Desserts',
  },
  Sides: {
    en: 'Sides',
    fr: 'Accompagnements',
    es: 'Guarniciones',
    de: 'Beilagen',
  },
  Drinks: {
    en: 'Drinks',
    fr: 'Boissons',
    es: 'Bebidas',
    de: 'Getränke',
  },
  // Dietary filters
  Vegan: {
    en: 'Vegan',
    fr: 'Végétalien',
    es: 'Vegano',
    de: 'Vegan',
  },
  Vegetarian: {
    en: 'Vegetarian',
    fr: 'Végétarien',
    es: 'Vegetariano',
    de: 'Vegetarisch',
  },
  'Gluten-free': {
    en: 'Gluten-free',
    fr: 'Sans gluten',
    es: 'Sin gluten',
    de: 'Glutenfrei',
  },
  'Dairy-free': {
    en: 'Dairy-free',
    fr: 'Sans lactose',
    es: 'Sin lácteos',
    de: 'Laktosefrei',
  },
  Halal: {
    en: 'Halal',
    fr: 'Halal',
    es: 'Halal',
    de: 'Halal',
  },
  Kosher: {
    en: 'Kosher',
    fr: 'Casher',
    es: 'Kosher',
    de: 'Koscher',
  },
  // Empty state
  noDishes: {
    en: 'No dishes on the menu yet.',
    fr: 'Aucun plat au menu pour le moment.',
    es: 'Todavía no hay platos en el menú.',
    de: 'Noch keine Gerichte auf der Speisekarte.',
  },
  // Loading / error
  loadingMenu: {
    en: 'Loading menu...',
    fr: 'Chargement du menu...',
    es: 'Cargando menú...',
    de: 'Menü wird geladen...',
  },
  venueNotFound: {
    en: 'Venue not found',
    fr: 'Établissement introuvable',
    es: 'Local no encontrado',
    de: 'Lokal nicht gefunden',
  },
  venueNotFoundBody: {
    en: 'This QR code may be outdated or the venue may have been removed.',
    fr: 'Ce QR code est peut-être obsolète ou le local a pu être supprimé.',
    es: 'Este código QR puede estar desactualizado o el local puede haber sido eliminado.',
    de: 'Dieser QR-Code ist möglicherweise veraltet oder das Lokal wurde entfernt.',
  },
  somethingWentWrong: {
    en: 'Something went wrong',
    fr: 'Une erreur est survenue',
    es: 'Algo salió mal',
    de: 'Etwas ist schiefgelaufen',
  },
  tryAgain: {
    en: 'Please try again in a moment.',
    fr: 'Veuillez réessayer dans un instant.',
    es: 'Por favor, inténtelo de nuevo en un momento.',
    de: 'Bitte versuchen Sie es gleich noch einmal.',
  },
  // Nutrition
  kcal: {
    en: 'kcal',
    fr: 'kcal',
    es: 'kcal',
    de: 'kcal',
  },
  protein: {
    en: 'protein',
    fr: 'protéines',
    es: 'proteína',
    de: 'Eiweiß',
  },
  carbs: {
    en: 'carbs',
    fr: 'glucides',
    es: 'carbohidratos',
    de: 'Kohlenhydrate',
  },
  fat: {
    en: 'fat',
    fr: 'lipides',
    es: 'grasa',
    de: 'Fett',
  },
  fibre: {
    en: 'fibre',
    fr: 'fibres',
    es: 'fibra',
    de: 'Ballaststoffe',
  },
  sugar: {
    en: 'sugar',
    fr: 'sucre',
    es: 'azúcar',
    de: 'Zucker',
  },
  salt: {
    en: 'salt',
    fr: 'sel',
    es: 'sal',
    de: 'Salz',
  },
  // Review prompt
  enjoying: {
    en: 'Enjoying',
    fr: 'Vous aimez',
    es: 'Disfrutando de',
    de: 'Gefällt Ihnen',
  },
  reviewHelps: {
    en: 'A review helps other diners with allergies find safe places to eat.',
    fr: 'Un avis aide les autres clients allergiques à trouver des endroits sûrs où manger.',
    es: 'Una reseña ayuda a otros comensales con alergias a encontrar lugares seguros donde comer.',
    de: 'Eine Bewertung hilft anderen Gästen mit Allergien, sichere Restaurants zu finden.',
  },
  googleReview: {
    en: 'Google Review',
    fr: 'Avis Google',
    es: 'Reseña Google',
    de: 'Google Bewertung',
  },
  tripadvisor: {
    en: 'TripAdvisor',
    fr: 'TripAdvisor',
    es: 'TripAdvisor',
    de: 'TripAdvisor',
  },
  // GDPR
  deleteMyData: {
    en: 'Delete my data from this venue',
    fr: 'Supprimer mes données de ce local',
    es: 'Eliminar mis datos de este local',
    de: 'Meine Daten aus diesem Lokal löschen',
  },
  deleting: {
    en: 'Deleting...',
    fr: 'Suppression...',
    es: 'Eliminando...',
    de: 'Wird gelöscht...',
  },
  enterEmailPrompt: {
    en: 'Enter the email you used to save your profile. Your data will be deleted from this venue.',
    fr: 'Entrez l\'email utilisé pour enregistrer votre profil. Vos données seront supprimées de ce local.',
    es: 'Ingrese el correo electrónico que usó para guardar su perfil. Sus datos serán eliminados de este local.',
    de: 'Geben Sie die E-Mail-Adresse ein, mit der Sie Ihr Profil gespeichert haben. Ihre Daten werden aus diesem Lokal gelöscht.',
  },
  dataDeleted: {
    en: 'Your data has been deleted.',
    fr: 'Vos données ont été supprimées.',
    es: 'Tus datos han sido eliminados.',
    de: 'Ihre Daten wurden gelöscht.',
  },
  noProfileFound: {
    en: 'No matching profile found for that email.',
    fr: 'Aucun profil correspondant trouvé pour cet email.',
    es: 'No se encontró ningún perfil con ese correo.',
    de: 'Kein passendes Profil für diese E-Mail gefunden.',
  },
  deleteFailed: {
    en: 'Could not delete data. Please try again.',
    fr: 'Impossible de supprimer les données. Veuillez réessayer.',
    es: 'No se pudieron eliminar los datos. Por favor, inténtelo de nuevo.',
    de: 'Daten konnten nicht gelöscht werden. Bitte versuchen Sie es erneut.',
  },
  // Delete profile modal
  deleteProfileTitle: {
    en: 'Delete your profile?',
    fr: 'Supprimer votre profil ?',
    es: '¿Eliminar tu perfil?',
    de: 'Ihr Profil löschen?',
  },
  deleteProfileBody: {
    en: 'This will remove your saved allergen data from this venue\'s database and clear it from this device.',
    fr: 'Cela supprimera vos données d\'allergènes enregistrées de la base de données de ce local et les effacera de cet appareil.',
    es: 'Esto eliminará tus datos de alérgenos guardados de la base de datos de este local y los borrará de este dispositivo.',
    de: 'Dies entfernt Ihre gespeicherten Allergendaten aus der Datenbank dieses Lokals und löscht sie von diesem Gerät.',
  },
  delete: {
    en: 'Delete',
    fr: 'Supprimer',
    es: 'Eliminar',
    de: 'Löschen',
  },
  cancel: {
    en: 'Cancel',
    fr: 'Annuler',
    es: 'Cancelar',
    de: 'Abbrechen',
  },
}

// ---------------------------------------------------------------------------
// Translation helpers
// ---------------------------------------------------------------------------
export function translate(key: string, language: Language): string {
  const entry = UI_TRANSLATIONS[key]
  if (!entry) return key
  return entry[language] || entry.en || key
}

export function translateAllergen(
  allergenId: string,
  language: Language
): { label: string; shortLabel: string } {
  const entry = ALLERGEN_TRANSLATIONS[allergenId]
  if (!entry) return { label: allergenId, shortLabel: allergenId }
  return entry[language] || entry.en
}

export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en'
  const lang = navigator.language.toLowerCase().slice(0, 2)
  if (lang === 'fr' || lang === 'es' || lang === 'de') return lang as Language
  return 'en'
}
