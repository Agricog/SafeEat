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

/**
 * Upload a file to R2.
 * Returns the public URL of the uploaded file.
 */
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

/**
 * Delete a file from R2.
 */
export async function deletePhoto(key) {
  const s3 = getClient()
  await s3.send(new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME || 'safeeat-photos',
    Key: key,
  }))
}

/**
 * Extract the R2 key from a full public URL.
 */
export function getKeyFromUrl(url) {
  const publicUrl = process.env.R2_PUBLIC_URL || ''
  if (publicUrl && url.startsWith(publicUrl)) {
    return url.slice(publicUrl.length + 1)
  }
  return null
}
