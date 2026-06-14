import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { TodoInput } from './TodoInput'

describe('TodoInput Component', () => {
  test('renders input and button', () => {
    const handleAdd = vi.fn()
    render(<TodoInput onAdd={handleAdd} />)

    expect(
      screen.getByPlaceholderText(/add a new geological task/i),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /submit new task/i }),
    ).toBeInTheDocument()
  })

  test('calls onAdd when submitted with text', () => {
    const handleAdd = vi.fn()
    render(<TodoInput onAdd={handleAdd} />)

    const input = screen.getByPlaceholderText(/add a new geological task/i)
    fireEvent.change(input, { target: { value: 'New Quartz Task' } })
    fireEvent.click(screen.getByRole('button', { name: /submit new task/i }))

    expect(handleAdd).toHaveBeenCalledWith('New Quartz Task')
    expect(input).toHaveValue('')
  })

  test('clears input when Escape is pressed', () => {
    render(<TodoInput onAdd={vi.fn()} />)

    const input = screen.getByPlaceholderText(/add a new geological task/i)
    fireEvent.change(input, { target: { value: 'Temp value' } })
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' })

    expect(input).toHaveValue('')
  })
})
