'use client';

import React from 'react';

import { useAppDispatch } from '@/store';
import { resetMainPageFilters } from '@/store/app';
import { Difficulties, Localed } from '@/types';

import { Button } from '@/components/ui';

import { MainPageFilter } from './components/filter';
import { MainPageSorting } from './components/sorting';

interface MainPageAsideLocalizations {
  sort: string;
  publishedAtAsc: string;
  publishedAtDesc: string;
  popularAsc: string;
  difficulty: string;
  difficulties: Difficulties;
  reset: string;
}

interface MainPageAsideProps {
  localizations: MainPageAsideLocalizations;
}

export function MainPageAside(props: Localed<MainPageAsideProps>) {
  const { locale, localizations } = props;
  const { sort, publishedAtAsc, publishedAtDesc, popularAsc, difficulty, difficulties, reset } =
    localizations;

  const dispatch = useAppDispatch();

  return (
    <>
      <MainPageFilter locale={locale} difficulty={difficulty} difficulties={difficulties} />
      <MainPageSorting localization={{ sort, publishedAtAsc, publishedAtDesc, popularAsc }} />
      <Button size="sm" variant="secondary" onClick={() => dispatch(resetMainPageFilters())}>
        {reset}
      </Button>
    </>
  );
}
