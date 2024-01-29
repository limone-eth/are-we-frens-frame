import { getFrameAccountAddress } from '@coinbase/onchainkit';
import { fetchERC20InCommon } from '../../lib/airstack/erc20-in-common';
import { TokenBlockchain } from '../../lib/airstack/types';
import { fetchNFTsInCommon } from '../../lib/airstack/nfts-in-common';
import { fetchPOAPsInCommon } from '../../lib/airstack/poaps-in-common';
import { fetchFarcasterFollowingsInCommon } from '../../lib/airstack/fc-followings-in-common';
import sharp from 'sharp';
import { generateImageSvg } from '../../lib/svg';
import { NextApiRequest, NextApiResponse } from 'next';
import { computeScore } from '../../lib/score';
import { getFarcasterIdentity } from '../../lib/web3-bio';

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  console.log(searchParams);
  const address = searchParams.get('address') ?? undefined;
  if (!address) {
    return new Response('Error: no address', { status: 400 });
  }
  const farcasterIdentity = await getFarcasterIdentity(address);
  if (!farcasterIdentity) {
    return new Response('Error: no farcaster identity found', { status: 400 });
  }
  const erc20InCommon = await Promise.all([
    fetchERC20InCommon('limone.eth', address || 'betashop.eth', TokenBlockchain.Ethereum),
    fetchERC20InCommon('limone.eth', address || 'betashop.eth', TokenBlockchain.Polygon),
    fetchERC20InCommon('limone.eth', address || 'betashop.eth', TokenBlockchain.Base),
    fetchERC20InCommon('limone.eth', address || 'betashop.eth', TokenBlockchain.Zora),
  ]);

  const nftsInCommon = await Promise.all([
    fetchNFTsInCommon('limone.eth', address || 'betashop.eth', TokenBlockchain.Ethereum),
    fetchNFTsInCommon('limone.eth', address || 'betashop.eth', TokenBlockchain.Polygon),
    fetchNFTsInCommon('limone.eth', address || 'betashop.eth', TokenBlockchain.Base),
    fetchNFTsInCommon('limone.eth', address || 'betashop.eth', TokenBlockchain.Zora),
  ]);

  const poapsInCommon = await fetchPOAPsInCommon('limone.eth', address || 'betashop.eth');

  const farcasterFollowingsInCommon = await fetchFarcasterFollowingsInCommon(
    'limone.eth',
    address || 'betashop.eth',
  );
  console.log({ erc20InCommon, nftsInCommon, poapsInCommon, farcasterFollowingsInCommon });
  /*const erc20InCommon = [
    { chain: TokenBlockchain.Ethereum, value: 2 },
    { chain: TokenBlockchain.Polygon, value: 0 },
    { chain: TokenBlockchain.Base, value: 10 },
    { chain: TokenBlockchain.Zora, value: 50 },
  ];
  const nftsInCommon = [
    { chain: TokenBlockchain.Ethereum, value: 2 },
    { chain: TokenBlockchain.Polygon, value: 52 },
    { chain: TokenBlockchain.Base, value: 13 },
    { chain: TokenBlockchain.Zora, value: 1 },
  ];
  const poapsInCommon = 13;
  const farcasterFollowingsInCommon = 125;*/

  const svg = await generateImageSvg(
    {
      imageUrl: farcasterIdentity.avatar,
      username: farcasterIdentity.identity,
    },
    erc20InCommon,
    nftsInCommon,
    poapsInCommon,
    farcasterFollowingsInCommon,
    computeScore(
      erc20InCommon.map((t) => t.value).reduce((a, b) => a + b, 0),
      nftsInCommon.map((t) => t.value).reduce((a, b) => a + b, 0),
      poapsInCommon,
      farcasterFollowingsInCommon,
    ),
  );

  // Convert SVG to PNG using Sharp
  const pngBuffer = await sharp(Buffer.from(svg)).toFormat('png').toBuffer();

  // Set the content type to PNG and send the response
  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'max-age=10',
    },
  });
};

export const dynamic = 'force-dynamic';
