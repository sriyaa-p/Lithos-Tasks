import { renderHook, act } from '@testing-library/react'
import { useTodos } from './useTodos'

describe('useTodos hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('should load empty list initially', () => {
    const { result } = renderHook(() => useTodos())
    expect(result.current.todos).toEqual([])
  })

  test('should add a new todo', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo('Test geological study')
    })
    expect(result.current.todos.length).toBe(1)
    expect(result.current.todos[0].title).toBe('Test geological study')
    expect(result.current.todos[0].completed).toBe(false)
  })

  test('should toggle todo completion', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo('Toggle item')
    })
    const id = result.current.todos[0].id
    act(() => {
      result.current.toggleTodo(id)
    })
    expect(result.current.todos[0].completed).toBe(true)
  })

  test('should edit todo title', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo('Original Title')
    })
    const id = result.current.todos[0].id
    act(() => {
      result.current.editTodo(id, 'Updated Title')
    })
    expect(result.current.todos[0].title).toBe('Updated Title')
  })

  test('should delete todo', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo('Delete me')
    })
    const id = result.current.todos[0].id
    act(() => {
      result.current.deleteTodo(id)
    })
    expect(result.current.todos.length).toBe(0)
  })

  test('should clear completed todos', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo('Completed item')
      result.current.addTodo('Active item')
    })
    // Active item is at index 0 after adding (prepended)
    // Completed item is at index 1
    // Complete the second item
    const completedId = result.current.todos[1].id
    act(() => {
      result.current.toggleTodo(completedId)
    })
    act(() => {
      result.current.clearCompleted()
    })
    expect(result.current.todos.length).toBe(1)
    expect(result.current.todos[0].title).toBe('Active item')
  })

  test('should persist in localStorage', () => {
    const { result } = renderHook(() => useTodos())
    act(() => {
      result.current.addTodo('Persistence test')
    })

    // Create new instance of hook to simulate page refresh
    const { result: newResult } = renderHook(() => useTodos())
    expect(newResult.current.todos.length).toBe(1)
    expect(newResult.current.todos[0].title).toBe('Persistence test')
  })
})
