import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { TodoItem } from './TodoItem'
import type { Todo } from '../types/todo'

describe('TodoItem Component', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Drill core sample',
    completed: false,
    createdAt: Date.now(),
  }

  const noop = () => {}

  test('renders item title and action buttons', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={noop}
        onEdit={noop}
        onDelete={noop}
      />,
    )
    expect(screen.getByText('Drill core sample')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /edit task/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /delete task/i }),
    ).toBeInTheDocument()
  })

  test('calls onToggle when checkmark is clicked', () => {
    const handleToggle = vi.fn()
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={handleToggle}
        onEdit={noop}
        onDelete={noop}
      />,
    )
    fireEvent.click(
      screen.getByRole('button', {
        name: /mark "drill core sample" as complete/i,
      }),
    )
    expect(handleToggle).toHaveBeenCalledWith('1')
  })

  test('enters edit mode and saves changes', () => {
    const handleEdit = vi.fn()
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={noop}
        onEdit={handleEdit}
        onDelete={noop}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: /edit task/i }))
    const input = screen.getByRole('textbox', { name: /edit task title/i })
    expect(input).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'Analyze minerals' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(handleEdit).toHaveBeenCalledWith('1', 'Analyze minerals')
  })
})
