interface QRCodeDisplayProps {
  url: string
  size?: number
  label?: string
}

export default function QRCodeDisplay({ url, size = 200, label }: QRCodeDisplayProps) {
  // Using QR Server API — free, no auth needed, no dependency
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}&margin=8`

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <img
          src={qrSrc}
          alt={`QR code for ${url}`}
          width={size}
          height={size}
          className="block"
        />
      </div>
      {label && (
        <p className="text-xs text-gray-500 text-center">{label}</p>
      )}
      <p className="text-xs text-gray-400 font-mono break-all text-center max-w-xs">{url}</p>
    </div>
  )
}
