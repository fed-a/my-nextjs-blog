'use client';

// ^ this file needs the "use client" pragma

import { ApolloProvider } from '@apollo/client';

import { getClient } from './client';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={getClient()}>{children}</ApolloProvider>;
}
