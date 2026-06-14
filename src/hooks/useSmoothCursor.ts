import { useEffect, useRef, useState } from 'react'

export interface CursorPosition {
  x: number
  y: number
}

export function useSmoothCursor() {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({
    x: -999,
    y: -999,
  })
  const [isMobileOrTouch, setIsMobileOrTouch] = useState<boolean>(false)

  const mouse = useRef<CursorPosition>({ x: -999, y: -999 })
  const smooth = useRef<CursorPosition>({ x: -999, y: -999 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const checkDevice = () => {
      const nav = navigator as Navigator & { msMaxTouchPoints?: number }
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (nav.msMaxTouchPoints !== undefined && nav.msMaxTouchPoints > 0)
      const isSmallScreen = window.innerWidth < 768
      setIsMobileOrTouch(isTouch || isSmallScreen)
    }

    checkDevice()
    window.addEventListener('resize', checkDevice)

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      // Initialize smooth position on first move to prevent slow lag from -999
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    const tick = () => {
      if (mouse.current.x !== -999 && mouse.current.y !== -999) {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1

        setCursorPos({
          x: Math.round(smooth.current.x * 100) / 100,
          y: Math.round(smooth.current.y * 100) / 100,
        })
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('resize', checkDevice)
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return { cursorPos, isMobileOrTouch }
}
