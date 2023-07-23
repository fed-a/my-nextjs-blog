'use client';

import { useIntersection } from '@mantine/hooks';
import { useEffect, useRef } from 'react';

interface Options {
  onLoadMore: () => void;
  hasMore: boolean;
}

export function useInfiniteScroll({ onLoadMore, hasMore }: Options) {
  const lastElementRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastElementRef.current,
    threshold: 1,
  });

  useEffect(() => {
    if (entry?.isIntersecting && hasMore) {
      onLoadMore();
    }
  }, [entry, entry?.isIntersecting, hasMore, onLoadMore]);

  return { ref };
}
