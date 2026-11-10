'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
const THEME_KEY = 'vsj.theme';

function readTheme(): Theme {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem(THEME_KEY, next);
    setTheme(next);
  };

  return { theme, toggle };
}
