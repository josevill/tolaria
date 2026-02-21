import { useEffect } from 'react'

interface KeyboardActions {
  onQuickOpen: () => void
  onCreateNote: () => void
  onSave: () => void
  onTrashNote: (path: string) => void
  activeTabPathRef: React.MutableRefObject<string | null>
  handleCloseTabRef: React.MutableRefObject<(path: string) => void>
}

export function useAppKeyboard({
  onQuickOpen, onCreateNote, onSave, onTrashNote,
  activeTabPathRef, handleCloseTabRef,
}: KeyboardActions) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return

      switch (e.key) {
        case 'p':
          e.preventDefault()
          onQuickOpen()
          break
        case 'n':
          e.preventDefault()
          onCreateNote()
          break
        case 's':
          e.preventDefault()
          onSave()
          break
        case 'w': {
          e.preventDefault()
          const path = activeTabPathRef.current
          if (path) handleCloseTabRef.current(path)
          break
        }
        case 'Backspace':
        case 'Delete': {
          e.preventDefault()
          const path = activeTabPathRef.current
          if (path) onTrashNote(path)
          break
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onQuickOpen, onCreateNote, onSave, onTrashNote, activeTabPathRef, handleCloseTabRef])
}
