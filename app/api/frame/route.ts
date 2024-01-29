import { getFrameAccountAddress } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { fetchERC20InCommon } from '../../lib/airstack/erc20-in-common';
import { TokenBlockchain } from '../../lib/airstack/types';
import { fetchNFTsInCommon } from '../../lib/airstack/nfts-in-common';
import { fetchPOAPsInCommon } from '../../lib/airstack/poaps-in-common';
import { fetchFarcasterFollowingsInCommon } from '../../lib/airstack/fc-followings-in-common';
import sharp from 'sharp';
import { generateImageSvg } from '../../lib/svg';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress = '';
  /*
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    accountAddress = await getFrameAccountAddress(body, {
      NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    });
  } catch (err) {
    console.error(err);
  }*/
  /*const erc20InCommon = await Promise.all([
    fetchERC20InCommon('limone.eth', accountAddress || 'betashop.eth', TokenBlockchain.Ethereum),
    fetchERC20InCommon('limone.eth', accountAddress || 'betashop.eth', TokenBlockchain.Polygon),
    fetchERC20InCommon('limone.eth', accountAddress || 'betashop.eth', TokenBlockchain.Base),
    fetchERC20InCommon('limone.eth', accountAddress || 'betashop.eth', TokenBlockchain.Zora),
  ]);

  const nftsInCommon = await Promise.all([
    fetchNFTsInCommon('limone.eth', accountAddress || 'betashop.eth', TokenBlockchain.Ethereum),
    fetchNFTsInCommon('limone.eth', accountAddress || 'betashop.eth', TokenBlockchain.Polygon),
    fetchNFTsInCommon('limone.eth', accountAddress || 'betashop.eth', TokenBlockchain.Base),
    fetchNFTsInCommon('limone.eth', accountAddress || 'betashop.eth', TokenBlockchain.Zora),
  ]);

  const poapsInCommon = await fetchPOAPsInCommon('limone.eth', accountAddress || 'betashop.eth');

  const farcasterFollowingsInCommon = await fetchFarcasterFollowingsInCommon(
    'limone.eth',
    accountAddress || 'betashop.eth',
  );
  console.log({ erc20InCommon, nftsInCommon, poapsInCommon, farcasterFollowingsInCommon });*/
  const erc20InCommon = [2, 3, 4, 5];
  const nftsInCommon = [2, 0, 10, 50];
  const poapsInCommon = 13;
  const farcasterFollowingsInCommon = 125;

  const svg = await generateImageSvg(
    erc20InCommon,
    nftsInCommon,
    poapsInCommon,
    farcasterFollowingsInCommon,
  );

  // Convert SVG to PNG using Sharp
  const pngBuffer = await sharp(Buffer.from(svg)).toFormat('png').toBuffer();
  // Set the content type to PNG and send the response
  res.setHeader('Content-Type', 'image/png');
  res.setHeader('Cache-Control', 'max-age=10');
  res.send(pngBuffer);
  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://lemon-frame.vercel.app/img-2.png" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
