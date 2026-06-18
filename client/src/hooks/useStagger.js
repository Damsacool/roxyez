import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function useStagger(selector, options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.7,
          stagger: options.stagger || 0.12,
          ease: options.ease || "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: options.start || "top 80%",
            once: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return containerRef
}