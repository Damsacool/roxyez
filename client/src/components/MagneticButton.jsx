import { useRef } from "react"
import { gsap } from "gsap"

export default function MagneticButton({ children, type = "submit", disabled, ...props }) {
  const btnRef = useRef(null)
  const textRef = useRef(null)

  const handleMove = (e) => {
    const btn = btnRef.current
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(btn, { x: x * 0.3, y: y * 0.4, duration: 0.3, ease: "power2.out" })
    gsap.to(textRef.current, { x: x * 0.15, y: y * 0.2, duration: 0.3, ease: "power2.out" })
  }

  const handleLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" })
    gsap.to(textRef.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" })
  }

  return (
    <button
      ref={btnRef}
      type={type}
      disabled={disabled}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative bg-yellow-500 text-gray-950 font-semibold px-10 py-4 rounded-full overflow-hidden disabled:opacity-50 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(201,169,110,0.5)]"
      {...props}
    >
      <span ref={textRef} className="relative inline-block">
        {children}
      </span>
    </button>
  )
}