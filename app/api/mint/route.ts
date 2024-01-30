import { NextRequest, NextResponse } from 'next/server';
import { claimNFT } from '../../lib/thirdweb';
import { hasClaimed, readImage } from '../../lib/redis';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { getFrameAccountAddress } from '@coinbase/onchainkit';
import { BASE_URL, INITIAL_IMAGE_URL, SUCCESS_IMAGE_URL } from '../../constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress = '';
  let username = '';
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    accountAddress = await getFrameAccountAddress(body, {
      NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    });
    // make sure to set your NEYNAR_API_KEY .env
    const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);
    const validateFrameAction = await client.validateFrameAction(body.trustedData?.messageBytes!);
    if (!validateFrameAction) {
      throw new Error('Invalid frame action');
    }
    console.log({ validateFrameAction });
    username = validateFrameAction.action?.interactor.username!;
  } catch (err) {
    console.error(err);
  }

  console.log({ accountAddress, username });
  if (!accountAddress || !username) {
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${INITIAL_IMAGE_URL}" />
    <meta property="fc:frame:button:1" content="try again" />
    <meta property="fc:frame:post_url" content="${BASE_URL}/api/mint" />
    </head></html>`);
  }
  const image = await readImage(accountAddress);
  if (!image) {
    console.log('no image', accountAddress);
    return new NextResponse('Error: no image', { status: 400 });
  }
  const didClaim = await hasClaimed(accountAddress);
  if (didClaim) {
    console.log('already claimed', accountAddress);
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_IMAGE_URL}" />
    </head></html>`);
  }
  console.log('claiming', accountAddress);
  await claimNFT(accountAddress!, username!, image);
  console.log('claimed', accountAddress);
  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_IMAGE_URL}" />
    </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
