'use client';

import { ThemeProvider } from 'next-themes';

import { ApolloWrapper } from '../apollo/apollo-wrapper';

import { SkeletonTheming } from './skeleton-theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ApolloWrapper>
        <ThemeProvider>
          <SkeletonTheming>{children}</SkeletonTheming>
        </ThemeProvider>
      </ApolloWrapper>
    </>
  );
}
