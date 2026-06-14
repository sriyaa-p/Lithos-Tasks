import type { TodoFilter } from '../types/todo'

export interface FilterBarProps {
  filter: TodoFilter
  onFilterChange: (filter: TodoFilter) => void
  activeCount: number
  hasCompleted: boolean
  onClearCompleted: () => void
}

export function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  hasCompleted,
  onClearCompleted,
}: FilterBarProps) {
  const filters: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ]

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-white text-sm">
      {/* Task Count */}
      <span className="font-medium text-white/70 select-none">
        {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
      </span>

      {/* Filters */}
      <div className="flex items-center gap-1.5 bg-black/35 border border-white/10 rounded-xl p-1">
        {filters.map((f) => {
          const isActive = filter === f.value
          return (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#e8702a] ${
                isActive
                  ? 'bg-white text-gray-900 shadow'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Clear Completed */}
      <button
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        className={`text-xs font-semibold px-3 py-2 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-400 ${
          hasCompleted
            ? 'text-red-400 hover:text-red-300 hover:bg-red-400/10'
            : 'text-white/20 cursor-not-allowed'
        }`}
      >
        Clear Completed
      </button>
    </div>
  )
}
