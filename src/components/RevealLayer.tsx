import { useEffect, useRef } from 'react'

export interface RevealLayerProps {
  image: string
  cursorX: number
  cursorY: number
  isMobileOrTouch: boolean
}

export function RevealLayer({
  image,
  cursorX,
  cursorY,
  isMobileOrTouch,
}: RevealLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const revealRef = useRef<HTMLDivElement | null>(null)
  const SPOTLIGHT_R = 260

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const revealDiv = revealRef.current

    if (!canvas || !revealDiv) return

    if (isMobileOrTouch) {
      // Show reveal image fully on mobile/touch
      revealDiv.style.maskImage = 'none'
      revealDiv.style.webkitMaskImage = 'none'
      return
    }

    // Don't draw if cursor position is default/off-screen
    if (cursorX === -999 || cursorY === -999) {
      revealDiv.style.maskImage =
        'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
      revealDiv.style.webkitMaskImage =
        'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
      return
    }

    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const grad = ctx.createRadialGradient(
        cursorX,
        cursorY,
        0,
        cursorX,
        cursorY,
        SPOTLIGHT_R,
      )
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 1)')
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.75)')
      grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.4)')
      grad.addColorStop(0.88, 'rgba(255, 255, 255, 0.12)')
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2)
      ctx.fill()

      try {
        const dataUrl = canvas.toDataURL()
        revealDiv.style.maskImage = `url(${dataUrl})`
        revealDiv.style.webkitMaskImage = `url(${dataUrl})`
        revealDiv.style.maskSize = '100% 100%'
        revealDiv.style.webkitMaskSize = '100% 100%'
      } catch (err) {
        console.error('Error creating mask data URL:', err)
      }
    }
  }, [cursorX, cursorY, isMobileOrTouch])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ display: 'none' }}
        data-testid="reveal-canvas"
      />
      <div
        ref={revealRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
        data-testid="reveal-layer-div"
      />
    </>
  )
}
