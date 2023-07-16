import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_NEXT_PUBLIC_STRAPI_ENDPOINT_GRAPHQL;

let client: ApolloClient<any> | null = null;

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  fetch,
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // TODO: Add token
  return forward(operation);
});

const onErrorLink = onError((error) => {
  console.error({ networkError: error });
});

const ssrLink = new SSRMultipartLink({
  stripDefer: true,
});

export const getClient = () => {
  const isServer = typeof window === 'undefined';
  const links = [onErrorLink, authMiddleware, httpLink];
  if (!client || isServer) {
    client = new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.from(isServer ? [ssrLink, ...links] : links),
    });
  }

  return client;
};

// export const { getClient } = registerApolloClient(() => {
//   return new ApolloClient({
//     cache: new InMemoryCache(),
//     link: new HttpLink({
//       // this needs to be an absolute url, as relative urls cannot be used in SSR
//       uri: GRAPHQL_ENDPOINT,
//       // you can disable result caching here if you want to
//       // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
//       // fetchOptions: { cache: "no-store" },
//     }),
//   });
// });
