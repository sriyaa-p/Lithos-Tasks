import { Search, X } from 'lucide-react'

export interface SearchBarProps {
  query: string
  onQueryChange: (query: string) => void
}

export function SearchBar({ query, onQueryChange }: SearchBarProps) {
  return (
    <div className="relative w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center px-4 py-2.5 focus-within:ring-2 focus-within:ring-[#e8702a] focus-within:border-transparent transition-all">
      <Search size={18} className="text-white/40 mr-2.5 flex-shrink-0" />
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search geological tasks..."
        className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-white/40 pr-8"
        aria-label="Search tasks"
      />
      {query && (
        <button
          onClick={() => onQueryChange('')}
          className="absolute right-4 text-white/40 hover:text-white p-0.5 rounded-full transition-colors cursor-pointer"
          aria-label="Clear search query"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
