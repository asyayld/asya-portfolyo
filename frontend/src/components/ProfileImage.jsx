import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function ProfileImage() {
  const [hasImage, setHasImage] = useState(true)
  const [expanded, setExpanded] = useState(false)

  const close = useCallback(() => setExpanded(false), [])

  useEffect(() => {
    if (!expanded) return

    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [expanded, close])

  const placeholder = (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-zinc-700 to-zinc-900 p-8 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-600/50 font-name text-4xl text-zinc-400">
        AY
      </div>
      <p className="text-sm text-zinc-500">
        Fotoğraf için{' '}
        <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-lime-400">
          public/asya.jpeg
        </code>{' '}
        dosyasını ekle
      </p>
    </div>
  )

  const imageContent = hasImage ? (
    <img
      src="/asya.jpeg"
      alt="Asya Yıldız"
      className="h-full w-full object-cover object-[center_20%]"
      onError={() => setHasImage(false)}
    />
  ) : (
    placeholder
  )

  return (
    <>
      <div className="relative mx-auto flex w-full max-w-sm items-center justify-center sm:max-w-md lg:max-w-none">
        <div
          className="absolute -bottom-3 -left-3 h-[92%] w-[88%] rounded-sm bg-white/10 sm:-bottom-4 sm:-left-4"
          aria-hidden
        />
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="group relative z-10 aspect-[3/4] w-full max-h-[70vh] cursor-zoom-in overflow-hidden rounded-sm bg-zinc-800 text-left shadow-2xl shadow-black/50 transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f] lg:aspect-auto lg:h-[min(85vh,640px)] lg:max-w-md"
          aria-label="Profil fotoğrafını büyüt"
        >
          {imageContent}
          <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            Büyüt
          </span>
        </button>
      </div>

      {expanded && (
        <div
          className="lightbox-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Profil fotoğrafı"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800/80 text-white transition-colors hover:bg-zinc-700"
            aria-label="Kapat"
          >
            <X size={22} />
          </button>

          <div
            className="lightbox-image relative max-h-[85vh] max-w-full overflow-hidden rounded-lg shadow-2xl sm:max-h-[92vh] sm:max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {hasImage ? (
              <img
                src="/asya.jpeg"
                alt="Asya Yıldız"
                className="max-h-[85vh] w-auto max-w-full object-contain sm:max-h-[92vh]"
              />
            ) : (
              <div className="flex min-h-[280px] min-w-[240px] flex-col items-center justify-center gap-4 bg-zinc-900 p-12">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-zinc-700 font-name text-5xl text-zinc-400">
                  AY
                </div>
                <p className="text-zinc-400">Profil fotoğrafı henüz eklenmedi</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
