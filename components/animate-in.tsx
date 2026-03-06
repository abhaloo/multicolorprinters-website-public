"use client"

import { useAnimateOnScroll } from "@/lib/use-animate-on-scroll"
import { cn } from "@/lib/utils"

type AnimationVariant = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in"

interface AnimateInProps {
    children: React.ReactNode
    variant?: AnimationVariant
    delay?: number
    className?: string
}

const variantClasses: Record<AnimationVariant, { initial: string; visible: string }> = {
    "fade-up": {
        initial: "opacity-0 translate-y-8",
        visible: "opacity-100 translate-y-0",
    },
    "fade-in": {
        initial: "opacity-0",
        visible: "opacity-100",
    },
    "fade-left": {
        initial: "opacity-0 -translate-x-8",
        visible: "opacity-100 translate-x-0",
    },
    "fade-right": {
        initial: "opacity-0 translate-x-8",
        visible: "opacity-100 translate-x-0",
    },
    "scale-in": {
        initial: "opacity-0 scale-95",
        visible: "opacity-100 scale-100",
    },
}

export function AnimateIn({
    children,
    variant = "fade-up",
    delay = 0,
    className,
}: AnimateInProps) {
    const { ref, isVisible, shouldAnimate } = useAnimateOnScroll()
    const v = variantClasses[variant]

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-700 ease-out",
                shouldAnimate ? (isVisible ? v.visible : v.initial) : "",
                className
            )}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    )
}
