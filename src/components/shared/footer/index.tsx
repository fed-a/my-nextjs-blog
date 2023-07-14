import React from 'react';

import { Localed } from '@/types/params';

import LanguageSelect from './components/language-select';

export function Footer({ locale }: Localed<{}>) {
  return (
    <footer className="grid h-24 place-items-center pb-16">
      <LanguageSelect locale={locale} />
    </footer>
  );
}
