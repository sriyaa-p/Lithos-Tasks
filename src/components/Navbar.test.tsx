import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from './Navbar'

describe('Navbar Component', () => {
  test('renders navigation wordmark and items', () => {
    render(<Navbar />)
    expect(screen.getByText('Lithos')).toBeInTheDocument()
    expect(screen.getByText('Course')).toBeInTheDocument()
    expect(screen.getByText('Field Guides')).toBeInTheDocument()
  })

  test('changes active navigation item on click', () => {
    render(<Navbar />)
    const geologyBtn = screen.getByRole('button', { name: 'Geology' })
    expect(geologyBtn).toBeInTheDocument()
    fireEvent.click(geologyBtn)
    expect(geologyBtn).toHaveClass('bg-white')
  })

  test('opens mobile drawer when toggle is clicked', () => {
    render(<Navbar />)
    const toggle = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    })
    expect(toggle).toBeInTheDocument()
    fireEvent.click(toggle)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
