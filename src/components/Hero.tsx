import { useState } from 'react'
import { BG_IMAGE_1, BG_IMAGE_2 } from '../constants/images'
import { RevealLayer } from './RevealLayer'
import { useTodos } from '../hooks/useTodos'
import { TodoInput } from './TodoInput'
import { TodoList } from './TodoList'
import { FilterBar } from './FilterBar'
import { SearchBar } from './SearchBar'
import type { TodoFilter } from '../types/todo'

export interface HeroProps {
  cursorPos: { x: number; y: number }
  isMobileOrTouch: boolean
}

export function Hero({ cursorPos, isMobileOrTouch }: HeroProps) {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted } =
    useTodos()

  const [filter, setFilter] = useState<TodoFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // 1. Filter tasks
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // 2. Search tasks
  const searchedTodos = filteredTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const activeCount = todos.filter((todo) => !todo.completed).length
  const hasCompleted = todos.some((todo) => todo.completed)

  return (
    <section
      className="relative w-full overflow-hidden h-screen bg-black"
      style={{ height: '100dvh' }}
      aria-label="Todo Dashboard"
    >
      {/* Background Layer 1: Base Image (desktop only) */}
      {!isMobileOrTouch && (
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
          style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
          data-testid="base-image"
        />
      )}

      {/* Background Layer 2: Reveal Mask Layer */}
      <RevealLayer
        image={BG_IMAGE_2}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
        isMobileOrTouch={isMobileOrTouch}
      />

      {/* Foreground Layer: Dashboard Content */}
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center px-4 sm:px-6">
        {/* Header Block */}
        <header
          className="text-center mb-6 hero-anim hero-reveal flex flex-col items-center select-none"
          style={{ animationDelay: '0.2s' }}
        >
          <h1 className="text-white text-3xl sm:text-5xl font-light tracking-tight flex items-center gap-2">
            <span className="font-playfair italic font-normal text-[#e8702a]">
              Lithos
            </span>{' '}
            Tasks
          </h1>
          <p className="text-[10px] sm:text-xs text-white/50 mt-1 uppercase tracking-widest font-semibold">
            Peeling back the layers of work
          </p>
        </header>

        {/* Dashboard Card Container */}
        <div
          className="bg-black/60 border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md flex flex-col gap-4 w-full max-w-xl hero-anim hero-fade"
          style={{ animationDelay: '0.4s' }}
          role="main"
        >
          {/* Search Bar */}
          <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />

          {/* Add Todo Input */}
          <TodoInput onAdd={addTodo} />

          {/* Scrollable Todo List */}
          <div
            className="flex-grow max-h-[35vh] sm:max-h-[40vh] overflow-y-auto pr-1 select-none"
            style={{ scrollbarWidth: 'thin' }}
          >
            <TodoList
              todos={searchedTodos}
              onToggle={toggleTodo}
              onEdit={editTodo}
              onDelete={deleteTodo}
            />
          </div>

          {/* Filters Bar */}
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            hasCompleted={hasCompleted}
            onClearCompleted={clearCompleted}
          />
        </div>
      </div>
    </section>
  )
}
