'use client';

import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

export function SkeletonTheming({ children }: { children: React.ReactNode }) {
  return (
    <SkeletonTheme
      baseColor="rgba(15, 16, 28, 0.1)"
      highlightColor="rgba(240, 240, 255, 0.2)"
      borderRadius={8}
      height={16}
      duration={1}
    >
      {children}
    </SkeletonTheme>
  );
}
