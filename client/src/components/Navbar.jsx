import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Books", path: "/books" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark")
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [dark])

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center">
          <svg width="180" height="60" viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
            <circle cx="36" cy="40" r="30" stroke="#C9A96E" fill="none" strokeWidth="1.2"/>
            <circle cx="36" cy="40" r="23" stroke="#C9A96E" fill="none" strokeWidth="0.6" strokeDasharray="3 2"/>
            <polygon points="36,18 52,25 36,32 20,25" fill="#C9A96E"/>
            <line x1="36" y1="32" x2="36" y2="43" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="49" y1="25" x2="49" y2="36" stroke="#C9A96E" strokeWidth="1.2" strokeLinecap="round"/>
            <circle cx="49" cy="38" r="2" fill="#C9A96E"/>
            <path d="M22,47 Q36,43 36,47 Q36,43 50,47 L50,60 Q36,57 36,60 Q36,57 22,60 Z" fill="#C9A96E"/>
            <line x1="36" y1="43" x2="36" y2="60" stroke="white" strokeWidth="0.8" strokeLinecap="round"/>
            <line x1="25" y1="51" x2="34" y2="50" stroke="white" strokeWidth="0.6" strokeLinecap="round"/>
            <line x1="25" y1="54" x2="34" y2="53" stroke="white" strokeWidth="0.6" strokeLinecap="round"/>
            <line x1="38" y1="50" x2="47" y2="51" stroke="white" strokeWidth="0.6" strokeLinecap="round"/>
            <line x1="38" y1="53" x2="47" y2="54" stroke="white" strokeWidth="0.6" strokeLinecap="round"/>
            <line x1="74" y1="12" x2="74" y2="68" stroke="#C9A96E" strokeWidth="0.8"/>
            <text x="82" y="26" fontFamily="Georgia, serif" fontSize="7" letterSpacing="3" fill="#C9A96E">PROF.</text>
            <text x="80" y="48" fontFamily="Georgia, serif" fontSize="20" className="fill-gray-900 dark:fill-white" fontWeight="700" letterSpacing="0.5">Roxanna</text>
            <text x="81" y="60" fontFamily="Georgia, serif" fontSize="9" fill="#C9A96E" letterSpacing="2.5">EZENEKWE</text>
            <line x1="81" y1="65" x2="238" y2="65" stroke="#C9A96E" strokeWidth="0.5"/>
            <text x="81" y="74" fontFamily="Georgia, serif" fontSize="5.5" letterSpacing="2" fill="#888888">EDUCATOR · AUTHOR · ENTREPRENEUR</text>
          </svg>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-yellow-600 border-b-2 border-yellow-600 pb-1"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {dark ? "☀" : "☾"}
          </button>
          <Link
            to="/contact"
            className="bg-gray-900 dark:bg-yellow-500 text-white dark:text-gray-950 text-sm px-5 py-2.5 rounded-full hover:bg-yellow-600 dark:hover:bg-yellow-400 transition-colors duration-200"
          >
            Work With Me
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:border-yellow-500 hover:text-yellow-500 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {dark ? "☀" : "☾"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
          >
            <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${
                isActive(link.path) ? "text-yellow-600" : "text-gray-700 dark:text-gray-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="bg-gray-900 dark:bg-yellow-500 text-white dark:text-gray-950 text-sm px-5 py-2.5 rounded-full text-center hover:bg-yellow-600 transition-colors duration-200"
            >
              Work With Me
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}