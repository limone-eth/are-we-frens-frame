export const LIMONE_USERNAME = 'limone.eth';

export const SCORE_MAP = {
  farcasterFollowings: 2,
  followedByOnFarcaster: 200,
  followingOnFarcaster: 200,
  commonErc20: 1,
  commonNfts: 3,
  commonPoaps: 5,
};

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://are-we-frens.limone.lol'
    : 'http://localhost:3000';

export const INITIAL_IMAGE_URL = `${BASE_URL}/base-img.png`;

export const SUCCESS_IMAGE_URL = `${BASE_URL}/success-img.png`;

export const BASE_NFT_COLLECTION_ADDRESS =
  process.env.NODE_ENV === 'production'
    ? '0xc52421dF5a3A1914Cb75CAFcFdAd66DC86570A2D'
    : '0x1A4AE61DcfefAE5E2214A4eBd8384502D0BA0448';

export const CHAIN = process.env.NODE_ENV === 'production' ? 'base' : 'base-goerli';
