import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState('Course')

  const navItems = ['Course', 'Field Guides', 'Geology', 'Plans', 'Live Tour']

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5"
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Left Section: Logo & Name */}
        <a
          href="#"
          className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-white rounded-md p-1"
          aria-label="Lithos home"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 256 256"
            fill="#ffffff"
            role="img"
            aria-label="Lithos Logo"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic select-none">
            Lithos
          </span>
        </a>

        {/* Center pill: Desktop Menu */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeItem === item
            return (
              <button
                key={item}
                onClick={() => setActiveItem(item)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                {item}
              </button>
            )
          })}
        </div>

        {/* Right Section: Desktop Sign Up */}
        <div className="hidden md:block">
          <button
            type="button"
            className="bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-white/80 focus:outline-none focus:ring-2 focus:ring-white p-1 rounded cursor-pointer"
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[90] md:hidden bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center gap-6"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {navItems.map((item) => {
            const isActive = activeItem === item
            return (
              <button
                key={item}
                onClick={() => {
                  setActiveItem(item)
                  setIsOpen(false)
                }}
                className={`text-xl font-medium px-6 py-2 rounded-full transition-colors cursor-pointer ${
                  isActive ? 'bg-white text-gray-900' : 'text-white/80'
                }`}
              >
                {item}
              </button>
            )
          })}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-white text-gray-900 text-base font-semibold px-8 py-3 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            Sign Up
          </button>
        </div>
      )}
    </>
  )
}
