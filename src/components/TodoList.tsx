import { TodoItem } from './TodoItem'
import type { Todo } from '../types/todo'

export interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onEdit, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-white/20 rounded-2xl bg-white/5 backdrop-blur-sm text-center">
        <p className="text-white/60 text-sm sm:text-base font-medium">
          No geological tasks found.
        </p>
        <p className="text-white/40 text-xs mt-1">
          Add a new task to get started or clear your filters.
        </p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-3 w-full" aria-label="Task List">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
