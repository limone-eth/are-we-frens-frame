import { fetchQuery } from '@airstack/node';
import { GetNftOwnedByAddressQueryQuery } from './types';

interface QueryResponse {
  data: GetNftOwnedByAddressQueryQuery | null;
  error: Error | null;
}

interface Error {
  message: string;
}

const query =
  /* GraphQL */
  `
    query GetNFTOwnedByAddressQuery($address: Identity!) {
      TokenBalances(
        input: {
          filter: {
            owner: { _eq: $address }
            tokenAddress: { _eq: "0xc52421df5a3a1914cb75cafcfdad66dc86570a2d" }
          }
          blockchain: base
          limit: 10
        }
      ) {
        TokenBalance {
          tokenAddress
          amount
          tokenType
          tokenNfts {
            tokenId
            contentValue {
              image {
                medium
              }
            }
          }
        }
      }
    }
  `;

export const fetchNFTImage = async (address: string) => {
  const { data, error }: QueryResponse = await fetchQuery(query, { address });
  console.log(data, error);
  if (
    error ||
    !data ||
    !data.TokenBalances?.TokenBalance ||
    data.TokenBalances.TokenBalance.length === 0
  ) {
    return false;
  }
  return data.TokenBalances?.TokenBalance[0].tokenNfts!.contentValue?.image?.medium;
};
