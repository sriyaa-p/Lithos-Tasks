import React, { useState } from 'react'
import { Plus } from 'lucide-react'

export interface TodoInputProps {
  onAdd: (title: string) => void
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) {
      onAdd(trimmed)
      setValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setValue('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2.5 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-[#e8702a] focus-within:border-transparent transition-all"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new geological task..."
        className="flex-grow bg-transparent text-white text-sm sm:text-base px-4 py-2.5 focus:outline-none placeholder-white/40"
        aria-label="Add a new task. Press Enter to save, Escape to clear."
      />
      <button
        type="submit"
        className="bg-[#e8702a] hover:bg-[#d2611f] text-white p-2.5 sm:px-5 sm:py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-[#e8702a]"
        aria-label="Submit new task"
      >
        <Plus size={18} />
        <span className="hidden sm:inline text-sm font-medium">Add Task</span>
      </button>
    </form>
  )
}
