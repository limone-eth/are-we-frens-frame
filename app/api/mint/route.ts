import { NextRequest, NextResponse } from 'next/server';
import { alreadyClaimed, claimNFT } from '../../lib/thirdweb';
import { readImage, setClaimed } from '../../lib/redis';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { FrameRequest, getFrameAccountAddress, getFrameMessage } from '@coinbase/onchainkit';
import { BASE_URL, INITIAL_IMAGE_URL, SUCCESS_IMAGE_URL } from '../../constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress = '';
  let username = '';
  try {
    const body: FrameRequest = await req.json();
    // Step 3. Validate the message
    const { isValid, message } = await getFrameMessage(body);

    // Step 4. Determine the experience based on the validity of the message
    if (isValid) {
      // Step 5. Get from the message the Account Address of the user using the Frame
      accountAddress = (await getFrameAccountAddress(message, {
        NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
      })) as string;
    } else {
      throw new Error("The message isn't valid");
    }
    // make sure to set your NEYNAR_API_KEY .env
    const client = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);
    const validateFrameAction = await client.validateFrameAction(body.trustedData?.messageBytes!);
    if (!validateFrameAction) {
      throw new Error('Invalid frame action');
    }
    username = validateFrameAction.action?.interactor.username!;
  } catch (err) {
    console.error(err);
  }

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
  const didClaim = await alreadyClaimed(accountAddress);
  if (didClaim) {
    console.log('already claimed', accountAddress);
    return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_IMAGE_URL}" />
    </head></html>`);
  }
  console.log('claiming', accountAddress);
  await claimNFT(accountAddress!, username!, image);
  await setClaimed(accountAddress);
  console.log('claimed', accountAddress);
  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${SUCCESS_IMAGE_URL}" />
    <meta property="fc:frame:button:1" content="get your image and post it below ✨" />
    <meta property="fc:frame:button:1:action" content="post_redirect" />
    <meta property="fc:frame:post_url" content="${BASE_URL}/api/redirect?address=${accountAddress}" />
    </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
