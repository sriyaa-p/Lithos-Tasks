import React, { useState, useRef, useEffect } from 'react'
import { Check, Trash2, Edit3, X, Save } from 'lucide-react'
import type { Todo } from '../types/todo'

export interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    const trimmed = editValue.trim()
    if (trimmed !== '') {
      onEdit(todo.id, trimmed)
      setIsEditing(false)
    } else {
      onDelete(todo.id)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditValue(todo.title)
      setIsEditing(false)
    }
  }

  return (
    <li
      className={`flex items-center justify-between gap-3 bg-white/5 backdrop-blur-sm border rounded-2xl p-4 transition-all hover:bg-white/10 ${
        todo.completed ? 'border-white/10 opacity-60' : 'border-white/20'
      }`}
      data-testid="todo-item"
    >
      <div className="flex items-center gap-3.5 flex-grow min-w-0">
        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#e8702a] focus:ring-offset-2 focus:ring-offset-black ${
            todo.completed
              ? 'bg-[#e8702a] border-[#e8702a] text-white'
              : 'border-white/40 hover:border-white text-transparent'
          }`}
          aria-label={
            todo.completed
              ? `Mark "${todo.title}" as incomplete`
              : `Mark "${todo.title}" as complete`
          }
        >
          <Check size={14} className={todo.completed ? 'opacity-100' : 'opacity-0'} />
        </button>

        {/* Text / Editing Input */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-white/10 border border-white/20 rounded-lg text-white px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#e8702a] text-sm sm:text-base"
            aria-label="Edit task title"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`text-white text-sm sm:text-base font-normal truncate select-none flex-grow ${
              todo.completed ? 'line-through text-white/50' : ''
            }`}
            title="Double click to edit"
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="p-2 text-green-400 hover:text-green-300 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 rounded-lg cursor-pointer"
              aria-label="Save changes"
            >
              <Save size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                setEditValue(todo.title)
                setIsEditing(false)
              }}
              className="p-2 text-red-400 hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg cursor-pointer"
              aria-label="Cancel editing"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="p-2 text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg cursor-pointer"
              aria-label={`Edit task "${todo.title}"`}
            >
              <Edit3 size={18} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(todo.id)}
              className="p-2 text-white/60 hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg cursor-pointer"
              aria-label={`Delete task "${todo.title}"`}
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </li>
  )
}
