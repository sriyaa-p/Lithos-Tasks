import { useState, useEffect } from 'react'
import type { Todo } from '../types/todo'

const LOCAL_STORAGE_KEY = 'lithos_todos'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (err) {
      console.error('Error parsing localStorage todos:', err)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    } catch (err) {
      console.error('Error writing todos to localStorage:', err)
    }
  }, [todos])

  const addTodo = (title: string) => {
    const trimmed = title.trim()
    if (!trimmed) return
    const newTodo: Todo = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      title: trimmed,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const editTodo = (id: string, title: string) => {
    const trimmed = title.trim()
    if (!trimmed) {
      deleteTodo(id)
      return
    }
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title: trimmed } : todo)),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
  }
}
