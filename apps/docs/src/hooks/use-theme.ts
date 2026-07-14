import { useState } from 'react'

export type Mode = 'light' | 'dark'
export type Theme = 'bold' | 'premium'

function readMode(): Mode {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'bold'
  return document.documentElement.getAttribute('data-theme') === 'premium' ? 'premium' : 'bold'
}

function applyMode(next: Mode) {
  document.documentElement.classList.toggle('dark', next === 'dark')
}

function applyTheme(next: Theme) {
  if (next === 'premium') {
    document.documentElement.setAttribute('data-theme', 'premium')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

export function useTheme() {
  const [mode, setModeState] = useState<Mode>(readMode)
  const [theme, setThemeState] = useState<Theme>(readTheme)

  const setMode = (next: Mode) => {
    setModeState(next)
    applyMode(next)
  }

  const setTheme = (next: Theme) => {
    setThemeState(next)
    applyTheme(next)
  }

  return { mode, setMode, theme, setTheme }
}
