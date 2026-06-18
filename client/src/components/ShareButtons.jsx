import { useState } from "react"

export default function ShareButtons({ title, url }) {
  const [copied, setCopied] = useState(false)

  const shareText = encodeURIComponent(title)
  const shareUrl = encodeURIComponent(url)

  const links = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.149-.15.347-.347.521-.521.174-.174.232-.298.346-.497.116-.198.027-.371-.027-.519-.054-.151-.567-1.368-.778-1.876-.21-.508-.421-.439-.578-.447-.156-.008-.336-.01-.518-.01-.182 0-.477.067-.726.336-.249.27-.951.928-.951 2.263 0 1.336.97 2.622 1.105 2.802.135.18 1.876 2.86 4.547 3.896.654.252 1.164.404 1.563.518.658.187 1.255.16 1.728.097.527-.07 1.622-.665 1.85-1.307.227-.642.227-1.193.16-1.307-.067-.114-.243-.18-.539-.327zm-5.422 7.413h-.005c-1.853 0-3.65-.497-5.225-1.435l-.375-.224-3.886 1.02 1.04-3.79-.245-.39C2.337 15.27 1.78 13.5 1.78 11.7c0-5.388 4.41-9.778 9.836-9.778 2.627 0 5.094 1.022 6.954 2.877 1.86 1.855 2.886 4.32 2.884 6.94-.003 5.39-4.41 9.778-9.842 9.778l-.005-.001zm8.413-18.183C18.404 1.55 15.197.005 11.78.005 5.36.005.21 5.14.213 11.557c0 2.06.539 4.07 1.563 5.84L.099 24l6.787-1.778c1.703.929 3.625 1.42 5.586 1.42h.005c6.418 0 11.566-5.135 11.568-11.554.001-3.087-1.201-5.989-3.388-8.176z" />
        </svg>
      ),
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-1.27 8.92-.157.93-.466 1.24-.766 1.27-.652.06-1.146-.43-1.78-.84-.99-.65-1.55-1.06-2.51-1.69-1.11-.74-.39-1.15.24-1.81.165-.17 3.025-2.77 3.085-3.01.008-.03.014-.142-.053-.2-.066-.06-.165-.04-.235-.022-.1.023-1.7 1.08-4.8 3.17-.45.31-.86.46-1.23.45-.405-.01-1.18-.23-1.76-.42-.71-.23-1.27-.35-1.22-.74.025-.2.3-.41.83-.62 3.26-1.42 5.43-2.36 6.51-2.81 3.1-1.29 3.75-1.51 4.17-1.52.09 0 .3.02.43.13.11.09.14.21.16.3-.01.06.02.24-.01.39z" />
        </svg>
      ),
    },
  ]

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
        Share this article
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        {links.map((link) => (
          <a 
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-yellow-500 hover:text-gray-950 transition-colors duration-200"
          >
            {link.icon}
          </a>
        ))}
        <button
          onClick={handleCopy}
          aria-label="Copy link"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-yellow-500 hover:text-gray-950 transition-colors duration-200 relative"
        >
          {copied ? (
            <span className="text-xs font-bold">✓</span>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757M10.81 15.312a4.5 4.5 0 01-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
            </svg>
          )}
        </button>
        {copied && (
          <span className="text-xs text-yellow-600 dark:text-yellow-500 font-medium">
            Link copied
          </span>
        )}
      </div>
    </div>
  )
}