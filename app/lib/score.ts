import { SCORE_MAP } from '../constants';

export const computeScore = (
  erc20InCommon: number,
  nftsInCommon: number,
  poapsInCommon: number,
  farcasterFollowingsInCommon: number,
): number => {
  return (
    erc20InCommon * SCORE_MAP.commonErc20 +
    nftsInCommon * SCORE_MAP.commonNfts +
    poapsInCommon * SCORE_MAP.commonPoaps +
    farcasterFollowingsInCommon * SCORE_MAP.farcasterFollowings
  );
};
