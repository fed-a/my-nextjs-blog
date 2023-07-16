import { OperationVariables, TypedDocumentNode } from '@apollo/client';

import { getClient } from '../apollo/client';

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI<
  TData extends { data: any },
  TVariables extends OperationVariables = OperationVariables,
>(query: TypedDocumentNode<TData, TVariables>, variables?: TVariables, client = getClient()) {
  return client
    .query<TData['data'], TVariables>({
      query,
      variables,
    })
    .then((result) => result);
}
