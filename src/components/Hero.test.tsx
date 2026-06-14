import { render, screen } from '@testing-library/react'
import { Hero } from './Hero'

describe('Hero Component (Todo Dashboard)', () => {
  const mockCursor = { x: 100, y: 100 }

  test('renders background and dashboard layout on desktop', () => {
    render(<Hero cursorPos={mockCursor} isMobileOrTouch={false} />)
    expect(screen.getByTestId('base-image')).toBeInTheDocument()
    expect(screen.getByText('Tasks')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/add a new geological task/i),
    ).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/search geological tasks/i),
    ).toBeInTheDocument()
  })

  test('does not render base image on mobile', () => {
    render(<Hero cursorPos={mockCursor} isMobileOrTouch={true} />)
    expect(screen.queryByTestId('base-image')).not.toBeInTheDocument()
  })
})
