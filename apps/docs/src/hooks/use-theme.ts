import { useState } from 'react'

export type Mode = 'light' | 'dark'
export type Theme = 'bold' | 'premium'
export type Glass = 'off' | 'regular' | 'clear'

function readMode(): Mode {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'bold'
  return document.documentElement.getAttribute('data-theme') === 'premium' ? 'premium' : 'bold'
}

function readGlass(): Glass {
  if (typeof document === 'undefined') return 'off'
  const value = document.documentElement.getAttribute('data-glass')
  return value === 'regular' || value === 'clear' ? value : 'off'
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

function applyGlass(next: Glass) {
  if (next === 'off') {
    document.documentElement.removeAttribute('data-glass')
  } else {
    document.documentElement.setAttribute('data-glass', next)
  }
}

export function useTheme() {
  const [mode, setModeState] = useState<Mode>(readMode)
  const [theme, setThemeState] = useState<Theme>(readTheme)
  const [glass, setGlassState] = useState<Glass>(readGlass)

  const setMode = (next: Mode) => {
    setModeState(next)
    applyMode(next)
  }

  const setTheme = (next: Theme) => {
    setThemeState(next)
    applyTheme(next)
  }

  const setGlass = (next: Glass) => {
    setGlassState(next)
    applyGlass(next)
  }

  return { mode, setMode, theme, setTheme, glass, setGlass }
}
