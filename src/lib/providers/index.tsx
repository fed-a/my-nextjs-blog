'use client';

import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

import { store } from '@/store';

import { ApolloWrapper } from '../apollo/apollo-wrapper';

import { SkeletonTheming } from './skeleton-theme';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <ApolloWrapper>
          <ThemeProvider>
            <SkeletonTheming>{children}</SkeletonTheming>
          </ThemeProvider>
        </ApolloWrapper>
      </Provider>
    </>
  );
}
