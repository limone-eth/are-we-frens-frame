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
    query GetNFTOwnedByAddressQuery($address: Address!) {
      TokenBalances(
        input: {
          filter: {
            owner: { _eq: "0x7b8691A5Add303acf49e9ff51134D501C7d012f2" }
            tokenAddress: { _eq: $address }
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
  if (
    error ||
    !data ||
    !data.TokenBalances?.TokenBalance ||
    data.TokenBalances.TokenBalance.length === 0
  ) {
    return false;
  }
  return data.TokenBalances?.TokenBalance[0].tokenNfts!.contentValue!.image!.medium;
};
