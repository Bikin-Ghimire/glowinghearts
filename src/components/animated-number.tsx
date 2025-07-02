'use client'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef } from 'react'

export function AnimatedNumber({
  end,
  start,
  decimals = 0,
}: {
  end: number
  start?: number
  decimals?: number
}) {
  // default start at half of end if no start prop provided
  const initial = start ?? end / 2
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  // animate value
  const value = useMotionValue(initial)
  const spring = useSpring(value, { damping: 10, stiffness: 100 })

  // format with commas and specified decimals
  const display = useTransform(spring, (num) =>
    num
      .toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
  )

  useEffect(() => {
    value.set(isInView ? end : initial)
  }, [end, initial, isInView, value])

  return <motion.span ref={ref}>{display}</motion.span>
}