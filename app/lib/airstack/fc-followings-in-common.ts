import { gql } from '@apollo/client/core';
import { fetchAllPagesQuery } from '.';
import { FetchFarcasterFollowingsInCommonQueryQuery, FetchPoaPsInCommonQueryQuery } from './types';

const query =
  /* GraphQL */
  gql`
    query FetchFarcasterFollowingsInCommonQuery($a: Identity!, $b: Identity!) {
      SocialFollowings(
        input: {
          filter: { identity: { _eq: $a }, dappName: { _eq: farcaster } }
          blockchain: ALL
          limit: 200
        }
      ) {
        Following {
          followingAddress {
            socialFollowings(
              input: { filter: { identity: { _eq: $b }, dappName: { _eq: farcaster } }, limit: 200 }
            ) {
              Following {
                followingAddress {
                  socials(input: { filter: { dappName: { _eq: farcaster } } }) {
                    fnames
                    profileName
                    userId
                    userAssociatedAddresses
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

export const fetchFarcasterFollowingsInCommon = async (a: string, b: string): Promise<any> => {
  const response = await fetchAllPagesQuery<FetchFarcasterFollowingsInCommonQueryQuery>(query, {
    a,
    b,
  });
  console.log('here');
  console.log(response);
  return response
    .filter(Boolean)
    .flatMap((x) => x.SocialFollowings)
    .flatMap((t) => t?.Following?.flatMap((x) => x?.followingAddress?.socialFollowings?.Following))
    .map((f) => f?.followingAddress?.socials?.length || 0)
    .reduce((a, b) => a + b, 0);
};
