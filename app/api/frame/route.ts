import { getFrameAccountAddress } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '../../constants';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress = '';
  try {
    const body: { trustedData?: { messageBytes?: string } } = await req.json();
    accountAddress = await getFrameAccountAddress(body, {
      NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    });
  } catch (err) {
    console.error(err);
  }

  console.log({ accountAddress });

  if (!accountAddress) {
    return new NextResponse('Error: invalid address', { status: 400 });
  }

  const address =
    accountAddress === '0x1358155a15930f89ebc787a34eb4ccfd9720bc62'
      ? 'betashop.eth'
      : accountAddress;

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content="${BASE_URL}/api/image?address=${address}" />
    <meta property="fc:frame:button:1" content="mint on base 🔵" />
    <meta property="fc:frame:post_url" content="${BASE_URL}/api/mint" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
