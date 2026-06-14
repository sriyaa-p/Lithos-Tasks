import { render, screen } from '@testing-library/react'
import { RevealLayer } from './RevealLayer'

describe('RevealLayer Component', () => {
  const mockImage = 'https://example.com/test.jpg'

  test('renders canvas and reveal div', () => {
    render(
      <RevealLayer
        image={mockImage}
        cursorX={100}
        cursorY={100}
        isMobileOrTouch={false}
      />,
    )
    const canvas = screen.getByTestId('reveal-canvas')
    const revealDiv = screen.getByTestId('reveal-layer-div')
    expect(canvas).toBeInTheDocument()
    expect(revealDiv).toBeInTheDocument()
    expect(revealDiv).toHaveStyle(`background-image: url(${mockImage})`)
  })

  test('handles mobile or touch mode (no mask)', () => {
    render(
      <RevealLayer
        image={mockImage}
        cursorX={100}
        cursorY={100}
        isMobileOrTouch={true}
      />,
    )
    const revealDiv = screen.getByTestId('reveal-layer-div')
    expect(revealDiv.style.maskImage).toBe('none')
  })
})
