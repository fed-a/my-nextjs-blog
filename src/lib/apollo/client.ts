import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_NEXT_PUBLIC_STRAPI_ENDPOINT_GRAPHQL;

// let client: ApolloClient<any> | null = null;

// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_NEXT_PUBLIC_STRAPI_ENDPOINT_GRAPHQL,
//   fetch,
// });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // TODO: Add token
//   return forward(operation);
// });

// const onErrorLink = onError((error) => {
//   console.error({ networkError: error });
// });

// export const getClient = () => {
//   // create a new client if there's no existing one
//   // or if we are running on the server.

//   if (!client || typeof window === 'undefined') {
//     client = new ApolloClient({
//       cache: new InMemoryCache(),
//       link: onErrorLink.concat(authMiddleware).concat(httpLink),
//     });
//   }

//   return client;
// };

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: GRAPHQL_ENDPOINT,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});
