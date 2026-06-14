
export interface StartButtonProps {
  onClick?: () => void
  label?: string
}

export function StartButton({
  onClick,
  label = 'Start Digging',
}: StartButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 focus:outline-none focus:ring-2 focus:ring-[#e8702a] focus:ring-offset-2 focus:ring-offset-black cursor-pointer"
      aria-label={label}
    >
      {label}
    </button>
  )
}
