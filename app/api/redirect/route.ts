import { NextRequest, NextResponse } from 'next/server';
import { BASE_URL } from '../../constants';

export async function POST(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address') ?? undefined;
  return new NextResponse(null, {
    status: 302,
    headers: { Location: `${BASE_URL}/image/${address}` },
  });
}

export const dynamic = 'force-dynamic';
