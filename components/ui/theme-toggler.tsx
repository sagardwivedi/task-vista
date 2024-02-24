'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';
import { Switch } from './switch';

export const ThemeToggler = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex h-10 items-center justify-center">
      <div className="flex flex-row items-center gap-2">
        <SunIcon className={cn(theme === 'light' ? '' : 'text-gray-400')} />
        <Switch
          checked={theme === 'dark' ? true : false}
          onCheckedChange={toggleTheme}
        />
        <MoonIcon className={cn(theme === 'dark' ? '' : 'text-gray-400')} />
      </div>
    </div>
  );
};
