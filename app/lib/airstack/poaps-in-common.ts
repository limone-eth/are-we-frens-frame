import { gql } from '@apollo/client/core';
import { fetchAllPagesQuery } from '.';
import {
  FetchNfTsInCommonQueryQuery,
  FetchPoaPsInCommonQueryQuery,
  TokenBlockchain,
} from './types';

const query =
  /* GraphQL */
  gql`
    query FetchPOAPsInCommonQuery($a: Identity!, $b: Identity!) {
      Poaps(input: { filter: { owner: { _eq: $a } }, blockchain: ALL, limit: 200 }) {
        Poap {
          poapEvent {
            poaps(input: { filter: { owner: { _eq: $b } } }) {
              poapEvent {
                eventName
              }
            }
          }
        }
      }
    }
  `;

export const fetchPOAPsInCommon = async (a: string, b: string): Promise<any> => {
  const response = await fetchAllPagesQuery<FetchPoaPsInCommonQueryQuery>(query, { a, b });
  return response
    .filter(Boolean)
    .flatMap((x) => x.Poaps?.Poap)
    .map((t) => t?.poapEvent?.poaps?.length || 0)
    .reduce((a, b) => a + b, 0);
};
