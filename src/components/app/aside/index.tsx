'use client';

import React from 'react';

import { useAppDispatch } from '@/store';
import { resetMainPageFilters } from '@/store/app';
import { Localed } from '@/types';
import { MainPageAsideLocalizations } from '@/types/app';

import { Button } from '@/components/ui';

import { MainPageFilter } from './components/filter';
import { MainPageSorting } from './components/sorting';

interface MainPageAsideProps {
  localizations: MainPageAsideLocalizations;
}

export function MainPageAside(props: Localed<MainPageAsideProps>) {
  const { locale, localizations } = props;
  const { sort, publishedAtAsc, publishedAtDesc, popularAsc, difficulty, difficulties, reset } =
    localizations;

  const dispatch = useAppDispatch();

  return (
    <aside className="flex flex-col order-1 gap-4 md:gap-8 gap border-b-[1px] pl-0 pb-4 border-input md:order-2 md:border-b-0 md:border-l-[1px] md:pl-12 lg:pl-20 xl:pl-28">
      <MainPageFilter locale={locale} difficulty={difficulty} difficulties={difficulties} />
      <MainPageSorting localization={{ sort, publishedAtAsc, publishedAtDesc, popularAsc }} />
      <Button size="sm" variant="outline" onClick={() => dispatch(resetMainPageFilters())}>
        {reset}
      </Button>
    </aside>
  );
}
