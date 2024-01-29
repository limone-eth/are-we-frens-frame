import { gql } from '@apollo/client/core';
import { fetchAllPagesQuery } from '.';
import {
  FetchErc20InCommonQueryQuery,
  FetchNfTsInCommonQueryQuery,
  TokenBalance,
  TokenBalancesOutput,
  TokenBlockchain,
  TokenInput,
} from './types';
import { FetchQuery } from '@airstack/node/dist/types/types';
import { TokenItem } from '../svg';

const query =
  /* GraphQL */
  gql`
    query FetchNFTsInCommonQuery($a: Identity!, $b: Identity!, $chain: TokenBlockchain!) {
      TokenBalances(
        input: {
          filter: { owner: { _eq: $a }, tokenType: { _in: [ERC721, ERC1155] } }
          blockchain: $chain
        }
      ) {
        TokenBalance {
          token {
            tokenBalances(
              input: { filter: { owner: { _eq: $b }, tokenType: { _in: [ERC721, ERC1155] } } }
            ) {
              id
              token {
                address
                symbol
                name
              }
            }
          }
        }
      }
    }
  `;

export const fetchNFTsInCommon = async (
  a: string,
  b: string,
  chain: TokenBlockchain,
): Promise<TokenItem> => {
  const response = await fetchAllPagesQuery<FetchNfTsInCommonQueryQuery>(query, { a, b, chain });
  return {
    chain: chain,
    value: response
      .filter(Boolean)
      .flatMap((x) => x.TokenBalances?.TokenBalance)
      .map((t) => t?.token?.tokenBalances?.length || 0)
      .reduce((a, b) => a + b, 0),
  };
};
