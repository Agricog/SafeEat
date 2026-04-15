import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

let client = null

function getClient() {
  if (client) return client
  client = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  })
  return client
}

export async function uploadPhoto(buffer, key, contentType) {
  const s3 = getClient()
  await s3.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME || 'safeeat-photos',
    Key: key,
    Body: buffer,
    ContentType: contentType,
  }))
  const publicUrl = process.env.R2_PUBLIC_URL || ''
  return `${publicUrl}/${key}`
}

export async function deletePhoto(key) {
  const s3 = getClient()
  await s3.send(new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME || 'safeeat-photos',
    Key: key,
  }))
}

export function getKeyFromUrl(url) {
  const publicUrl = process.env.R2_PUBLIC_URL || ''
  if (publicUrl && url.startsWith(publicUrl)) {
    return url.slice(publicUrl.length + 1)
  }
  return null
}
