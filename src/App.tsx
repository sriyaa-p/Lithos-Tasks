import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { useSmoothCursor } from './hooks/useSmoothCursor'

function App() {
  const { cursorPos, isMobileOrTouch } = useSmoothCursor()

  return (
    <div
      className="min-h-screen bg-white tracking-[-0.02em]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Navbar />
      <main>
        <Hero cursorPos={cursorPos} isMobileOrTouch={isMobileOrTouch} />
      </main>
    </div>
  )
}

export default App
