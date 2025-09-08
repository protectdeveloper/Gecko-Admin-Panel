'use client';

import * as React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { CustomFrance, CustomGermany, CustomTurkey, CustomUsa } from '@/components/svg-flag-icons';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';

export function LanguageToggle() {
  const router = useRouter();
  const { changeLanguage, currentLanguage, isClient } = useTranslation();

  const handleLanguageChange = (language: string) => {
    if (isClient && typeof changeLanguage === 'function') {
      changeLanguage(language);
      router.refresh();
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" disabled={!isClient}>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange('tr')}
          className={currentLanguage === 'tr' ? 'bg-accent' : ''}
          disabled={!isClient}
        >
          <CustomTurkey className="h-4 w-4 mr-2 my-2" />
          Türkçe
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('en')}
          className={currentLanguage === 'en' ? 'bg-accent' : ''}
          disabled={!isClient}
        >
          <CustomUsa className="h-4 w-4 mr-2" />
          İngilizce
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('de')}
          className={currentLanguage === 'de' ? 'bg-accent' : ''}
          disabled={!isClient}
        >
          <CustomGermany className="h-4 w-4 mr-2" />
          Almanca
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange('fr')}
          className={currentLanguage === 'fr' ? 'bg-accent' : ''}
          disabled={!isClient}
        >
          <CustomFrance className="h-4 w-4 mr-2" />
          Fransızca
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
