import { SCORE_MAP } from '../constants';

export const computeScore = (
  nftsInCommon: number,
  poapsInCommon: number,
  farcasterFollowingsInCommon: number,
  followedByOnFarcaster: boolean,
  followingOnFarcaster: boolean,
): string => {
  const score =
    nftsInCommon * SCORE_MAP.commonNfts +
    poapsInCommon * SCORE_MAP.commonPoaps +
    farcasterFollowingsInCommon * SCORE_MAP.farcasterFollowings +
    (followedByOnFarcaster ? SCORE_MAP.followedByOnFarcaster : 0) +
    (followingOnFarcaster ? SCORE_MAP.followingOnFarcaster : 0);

  // normalize between 0 and 10 knowing that the max value of score is 3598
  return ((score / 3598) * 10).toFixed(2);
};
