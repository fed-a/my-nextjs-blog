'use client';

import { useTheme } from 'next-themes';
import React, { useCallback } from 'react';

import { Button } from '@/components/ui';

import './theme-toggle.css';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const onThemeChange = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return (
    <Button
      variant="ghost"
      onClick={onThemeChange}
      className="inline-block h-9 w-9 p-2"
      aria-label="Color theme"
    >
      <div className="theme-toggle" />
    </Button>
  );
}
