'use client';

import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { SelectMainPageFilter, setDifficulty } from '@/store/app';
import { Difficulties } from '@/types';
import { MainPageFilters } from '@/types/app';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

import { useSSR } from '@/lib/hooks';
import { Locale } from '@/lib/i18n';

import { Tags } from './tags';

interface MainPageFilterProps {
  locale: Locale;
  difficulty: string;
  difficulties: Difficulties;
}

export function MainPageFilter({ locale, difficulties, difficulty }: MainPageFilterProps) {
  const { difficulty: difficultyStore } = useAppSelector(SelectMainPageFilter);
  const dispatch = useAppDispatch();
  const { isServer } = useSSR();

  const onDifficultyChange = useCallback(
    (newDifficulty: string) => {
      dispatch(setDifficulty(newDifficulty as MainPageFilters['difficulty']));
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col gap-12">
      <Tags locale={locale} />
      <Select
        disabled={isServer}
        value={isServer || !difficultyStore ? undefined : difficultyStore}
        onValueChange={onDifficultyChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={difficulty} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(difficulties).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
