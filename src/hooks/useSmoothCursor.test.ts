import { renderHook, act } from '@testing-library/react'
import { useSmoothCursor } from './useSmoothCursor'

describe('useSmoothCursor hook', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('initializes with default values', () => {
    const { result } = renderHook(() => useSmoothCursor())
    expect(result.current.cursorPos).toEqual({ x: -999, y: -999 })
    expect(typeof result.current.isMobileOrTouch).toBe('boolean')
  })

  test('updates coordinates on mousemove', () => {
    const { result } = renderHook(() => useSmoothCursor())

    act(() => {
      window.dispatchEvent(
        new MouseEvent('mousemove', { clientX: 200, clientY: 300 }),
      )
    })

    // Advance animation frame (lerp will run)
    act(() => {
      vi.advanceTimersByTime(16)
    })

    // It should have moved from default values
    expect(result.current.cursorPos.x).not.toBe(-999)
    expect(result.current.cursorPos.y).not.toBe(-999)
  })
})
