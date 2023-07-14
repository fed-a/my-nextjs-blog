'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

import { Locale } from '@/lib/i18n';

export default function LanguageSelect({ locale }: { locale: Locale }) {
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setDisabled(false);
  }, []);

  const onChange = useCallback(
    (newLocale: Locale) => {
      setDisabled(true);
      router.push(`/${newLocale}${pathname.replace(`/${locale}`, '')}`);
    },
    [locale, pathname, router],
  );

  return (
    <Select disabled={disabled} defaultValue={locale} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="de">Deutsch (de)</SelectItem>
        <SelectItem value="en">English (en)</SelectItem>
        <SelectItem value="ru">Русский (ru)</SelectItem>
        <SelectItem value="sv">Svenska (sv)</SelectItem>
      </SelectContent>
    </Select>
  );
}
