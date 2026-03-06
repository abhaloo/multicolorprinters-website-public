"use client"

import { useEffect, useRef, useState } from "react"

interface UseAnimateOnScrollOptions {
    threshold?: number
    rootMargin?: string
    once?: boolean
}

export function useAnimateOnScroll(options: UseAnimateOnScrollOptions = {}) {
    const { threshold = 0.15, rootMargin = "0px 0px -60px 0px", once = true } = options
    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [shouldAnimate, setShouldAnimate] = useState(false)

    useEffect(() => {
        // Respect reduced motion preference
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setIsVisible(true)
            return
        }

        // Mark that JS has hydrated — safe to animate
        setShouldAnimate(true)

        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    if (once) observer.unobserve(el)
                } else if (!once) {
                    setIsVisible(false)
                }
            },
            { threshold, rootMargin }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [threshold, rootMargin, once])

    return { ref, isVisible, shouldAnimate }
}
