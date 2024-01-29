import { gql } from '@apollo/client/core';
import { fetchAllPagesQuery } from '.';
import {
  FetchErc20InCommonQueryQuery,
  TokenBalance,
  TokenBalancesOutput,
  TokenBlockchain,
} from './types';
import { FetchQuery } from '@airstack/node/dist/types/types';
import { TokenItem } from '../svg';

const query =
  /* GraphQL */
  gql`
    query FetchERC20InCommonQuery($a: Identity!, $b: Identity!, $chain: TokenBlockchain!) {
      TokenBalances(
        input: { filter: { owner: { _eq: $a }, tokenType: { _eq: ERC20 } }, blockchain: $chain }
      ) {
        TokenBalance {
          token {
            tokenBalances(input: { filter: { owner: { _eq: $b }, tokenType: { _eq: ERC20 } } }) {
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

export const fetchERC20InCommon = async (
  a: string,
  b: string,
  chain: TokenBlockchain,
): Promise<TokenItem> => {
  const response = await fetchAllPagesQuery<FetchErc20InCommonQueryQuery>(query, { a, b, chain });

  return {
    chain: chain,
    value: response
      .filter(Boolean)
      .flatMap((x) => x.TokenBalances?.TokenBalance)
      .map((t) => t?.token?.tokenBalances?.length || 0)
      .reduce((a, b) => a + b, 0),
  };
};
