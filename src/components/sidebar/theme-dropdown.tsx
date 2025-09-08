'use client';

import * as React from 'react';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ThemeColorPicker } from '@/components/theme/theme-color-picker';

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="flex flex-col gap-2 w-64">
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={cn(
            'gap-2 text-yellow-900 bg-yellow-50 hover:bg-yellow-100',
            'dark:bg-white/5 dark:text-yellow-300 dark:hover:bg-white/10'
          )}
        >
          <Sun className="size-4 text-yellow-500 dark:text-yellow-300" />
          Açık Tema
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={cn(
            'gap-2 text-gray-900 bg-gray-100 hover:bg-gray-200',
            'dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
          )}
        >
          <Moon className="size-4 text-gray-700 dark:text-blue-300" />
          Koyu Tema
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={cn(
            'gap-2 text-slate-800 bg-slate-100 hover:bg-slate-200',
            'dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600'
          )}
        >
          <Laptop className="size-4 text-slate-500 dark:text-slate-300" />
          Sistem Teması
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <div className="px-2 py-2">
          <ThemeColorPicker />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
