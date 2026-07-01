import { Link } from "react-router-dom"

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Books", path: "/books"},
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
]

const socials = [
  { name: "YouTube", url: "https://www.youtube.com/@roxyezmathandmoney" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/rezenekwe/" },
  { name: "Instagram", url: "https://www.instagram.com/roxannaezenekwe" },
  { name: "TikTok", url: "https://www.tiktok.com/@roxannaezenekwe" },
  { name: "Facebook", url: "https://web.facebook.com/roxanna.e.otaluka.ezenekwe" },
]

const featuredLinks = [
  { name: "RoxyEZ Academy", url: "https://roxyezacademy.com" },
  { name: "The Learning Lab", url: "https://thelearninglab600.shop" },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 dark:bg-black text-gray-400 dark:text-gray-500 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="flex flex-col gap-4">
            <div className="-ml-2">
              <img
                src="/logo.svg"
                alt="Prof. Roxanna Ezenekwe"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Mathematics educator, author, financial literacy advocate, entrepreneur, and AI & education thought leader.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white text-sm font-semibold tracking-widest uppercase mb-2">
              Navigate
            </p>
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm hover:text-yellow-500 transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-white text-sm font-semibold tracking-widest uppercase mb-2">
              Connect
            </p>
            {featuredLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-yellow-500 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-yellow-500 transition-colors duration-200"
              >
                {social.name}
              </a>
            ))}
          </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            Copyright 2026 RoxyEZ74 Consulting LLC. All rights reserved.
          </p>
          <p className="text-xs">
            Built by{" "}
            <a
              href="https://www.linkedin.com/in/akande-a-adesina"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline"
            >
              Damsa
            </a>
            {" and "}
            <a
              href="https://www.linkedin.com/in/abdul-qoyyum-761599266"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline"
            >
              Abdul
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}