import { TokenBlockchain } from '../../lib/airstack/types';
import sharp from 'sharp';
import { generateImageSvg } from '../../lib/svg';
import { computeScore } from '../../lib/score';
import { getFarcasterIdentity } from '../../lib/web3-bio';
import { setImage } from '../../lib/redis';
import { fetchFarcasterFollowingsInCommon } from '../../lib/airstack/fc-followings-in-common';
import { fetchNFTsInCommon } from '../../lib/airstack/nfts-in-common';
import { fetchPOAPsInCommon } from '../../lib/airstack/poaps-in-common';
import { isFollowingOnFarcaster } from '../../lib/airstack/farcaster-follower';

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address') ?? undefined;
  if (!address) {
    return new Response('Error: no address', { status: 400 });
  }
  const farcasterIdentity = await getFarcasterIdentity(address);
  if (!farcasterIdentity) {
    return new Response('Error: no farcaster identity found', { status: 400 });
  }

  /*const followedByOnFarcaster = await isFollowingOnFarcaster('limone.eth', address);
  const followingOnFarcaster = await isFollowingOnFarcaster(address, 'limone.eth');
  console.log({ followedByOnFarcaster, followingOnFarcaster });
  const nftsInCommon = await Promise.all([
    fetchNFTsInCommon('limone.eth', address, TokenBlockchain.Ethereum),
    fetchNFTsInCommon('limone.eth', address, TokenBlockchain.Polygon),
    fetchNFTsInCommon('limone.eth', address, TokenBlockchain.Base),
    fetchNFTsInCommon('limone.eth', address, TokenBlockchain.Zora),
  ]);

  const poapsInCommon = await fetchPOAPsInCommon('limone.eth', address);

  const farcasterFollowingsInCommon = await fetchFarcasterFollowingsInCommon('limone.eth', address);
  console.log({ nftsInCommon, poapsInCommon, farcasterFollowingsInCommon });*/
  const followedByOnFarcaster = true;
  const followingOnFarcaster = false;

  const nftsInCommon = [
    { chain: TokenBlockchain.Ethereum, value: 2 },
    { chain: TokenBlockchain.Polygon, value: 52 },
    { chain: TokenBlockchain.Base, value: 13 },
    { chain: TokenBlockchain.Zora, value: 1 },
  ];
  const poapsInCommon = 13;
  const farcasterFollowingsInCommon = 125;

  console.log(farcasterIdentity);

  const svg = await generateImageSvg(
    {
      imageUrl: farcasterIdentity.avatar,
      username: farcasterIdentity.identity,
    },
    computeScore(
      nftsInCommon.map((t) => t.value).reduce((a, b) => a + b, 0),
      poapsInCommon,
      farcasterFollowingsInCommon,
      followedByOnFarcaster,
      followingOnFarcaster,
    ),
  );

  // Convert SVG to PNG using Sharp
  const pngBuffer = await sharp(Buffer.from(svg)).toFormat('png').toBuffer();

  await setImage(pngBuffer, address);

  // Set the content type to PNG and send the response
  return new Response(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'max-age=10',
    },
  });
};

export const dynamic = 'force-dynamic';
