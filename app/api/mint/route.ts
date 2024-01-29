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
  /*let accountAddress = '';
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    accountAddress = await getFrameAccountAddress(body, {
      NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    });
  } catch (err) {
    console.error(err);
  }*/
  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="https://are-we-frens-frame.vercel.app/api/image?address=betashop.eth" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
