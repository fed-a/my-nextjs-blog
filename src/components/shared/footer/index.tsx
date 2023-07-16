import React from 'react';

import { Localed } from '@/types/params';

import LanguageSelect from './components/language-select';

export function Footer({ locale }: Localed<{}>) {
  return (
    <footer className="grid h-[12rem] bg-gray-500/5 place-items-center">
      <LanguageSelect locale={locale} />
    </footer>
  );
}
