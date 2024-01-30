import { fetchQuery } from '@airstack/node';
import { FetchIsFollowingOnFarcasterQueryQuery } from './types';

const query = /* GraphQL */ `
  query FetchIsFollowingOnFarcasterQuery($identityA: Identity!, $identityB: Identity!) {
    Wallet(input: { identity: $identityA, blockchain: ethereum }) {
      socialFollowers( # Check if $identityA is a follower of $identityB
        input: { filter: { identity: { _eq: $identityB }, dappName: { _eq: farcaster } } }
      ) {
        Follower {
          dappName
          dappSlug
          followingProfileId
          followerProfileId
          followingAddress {
            addresses
            socials {
              dappName
              profileName
            }
            domains {
              name
            }
          }
        }
      }
    }
  }
`;

interface QueryResponse {
  data: FetchIsFollowingOnFarcasterQueryQuery | null;
  error: Error | null;
}

interface Error {
  message: string;
}

export const isFollowingOnFarcaster = async (identityA: string, identityB: string) => {
  const { data, error }: QueryResponse = await fetchQuery(query, { identityA, identityB });
  if (error || !data || !data.Wallet?.socialFollowers?.Follower) {
    return false;
  }
  return true;
};
