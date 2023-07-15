'use client';

import { useUnit } from 'effector-react';
import React, { useCallback } from 'react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

import { $mainPageSorting, setMainPageSorting } from '../../model';
import { MAIN_PAGE_SORTING, MainPageSortings } from '../../types';

interface MainPageSortingProps {
  localization: {
    sort: string;
    publishedAtAsc: string;
    publishedAtDesc: string;
    popularAsc: string;
  };
}

export function MainPageSorting({ localization }: MainPageSortingProps) {
  const [sorting, setSorting] = useUnit([$mainPageSorting, setMainPageSorting]);
  const { sort, publishedAtAsc, publishedAtDesc, popularAsc } = localization;

  const localedOptions = [publishedAtAsc, publishedAtDesc, popularAsc];

  const onChange = useCallback(
    (newSort: MainPageSortings) => {
      setSorting(newSort);
    },
    [setSorting],
  );

  return (
    <Select value={sorting} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue suppressHydrationWarning placeholder={sort} />
      </SelectTrigger>
      <SelectContent>
        {MAIN_PAGE_SORTING.map(({ id }, index) => (
          <SelectItem key={id} value={id}>
            {localedOptions[index]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
