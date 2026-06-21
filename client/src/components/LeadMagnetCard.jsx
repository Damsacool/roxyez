import { useRef, useEffect } from "react"
import { gsap } from "gsap"

export default function LeadMagnetCard({ children }) {
  const cardRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(glow, {
        x: x - 150,
        y: y - 150,
        duration: 0.4,
        ease: "power2.out",
      })

      const rotateX = ((y - rect.height / 2) / rect.height) * -6
      const rotateY = ((x - rect.width / 2) / rect.width) * 6

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      })
    }

    const handleLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      })
    }

    card.addEventListener("mousemove", handleMove)
    card.addEventListener("mouseleave", handleLeave)

    return () => {
      card.removeEventListener("mousemove", handleMove)
      card.removeEventListener("mouseleave", handleLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-3xl bg-gray-950 border border-yellow-500/30 p-10 md:p-14"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-[300px] h-[300px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #C9A96E, transparent 70%)" }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}