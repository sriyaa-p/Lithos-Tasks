import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component Integration', () => {
  test('renders Navbar and Todo Dashboard', () => {
    render(<App />)

    // Check Navbar elements
    expect(screen.getByRole('link', { name: /lithos home/i })).toBeInTheDocument()

    // Check Hero/Dashboard elements - "Lithos" appears in both navbar and header
    const lithosTitles = screen.getAllByText('Lithos')
    expect(lithosTitles.length).toBeGreaterThan(0)
    
    expect(screen.getByText('Tasks')).toBeInTheDocument()
    expect(
      screen.getByPlaceholderText(/add a new geological task/i),
    ).toBeInTheDocument()
  })
})
