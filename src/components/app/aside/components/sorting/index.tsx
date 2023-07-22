'use client';

import React, { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { SelectMainPageFilter, setSorting } from '@/store/app';
import { MAIN_PAGE_SORTING, MainPageSortings } from '@/types/app';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

import { useSSR } from '@/lib/hooks';

interface MainPageSortingProps {
  localization: {
    sort: string;
    publishedAtAsc: string;
    publishedAtDesc: string;
    popularAsc: string;
  };
}

export function MainPageSorting({ localization }: MainPageSortingProps) {
  const dispatch = useAppDispatch();
  const { sorting } = useAppSelector(SelectMainPageFilter);
  const { isServer } = useSSR();
  const { sort, publishedAtAsc, publishedAtDesc, popularAsc } = localization ?? {};

  const localedOptions = [publishedAtAsc, publishedAtDesc, popularAsc];

  const onChange = useCallback(
    (newSort: MainPageSortings) => {
      dispatch(setSorting(newSort));
    },
    [dispatch],
  );

  return (
    <Select disabled={isServer} value={isServer ? undefined : sorting} onValueChange={onChange}>
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
