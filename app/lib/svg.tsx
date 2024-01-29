import { join } from 'path';
import satori from 'satori';
import * as fs from 'fs';
import Grid from '../components/grid';
import { TokenBlockchain } from './airstack/types';
import Avatar from '../components/avatar';

const fontPath = join(process.cwd(), 'HirukoBlackAlternate.ttf');
let fontData = fs.readFileSync(fontPath);

const scoreFontPath = join(process.cwd(), 'DK-Smiling-Cat.otf');
let scoreFontData = fs.readFileSync(scoreFontPath);

export interface TokenItem {
  chain: TokenBlockchain;
  value: number;
}

export interface Profile {
  imageUrl: string;
  username: string;
}

export const generateImageSvg = async (
  profile: Profile,
  erc20inCommon: TokenItem[],
  nftsInCommon: TokenItem[],
  poapsInCommon: number,
  farcasterFollowingsInCommon: number,
  score: number,
): Promise<string> => {
  return await satori(
    <div
      style={{
        backgroundColor: '#BDE86B',
        display: 'flex',
        flexDirection: 'row',
        padding: '0.5rem',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '1rem',
          }}
        >
          <Avatar imageUrl={`${process.env.BASE_URL}/limone-pfp.png`} username="limone.eth" />
          <div style={{ fontSize: '24px' }}>&</div>
          <Avatar imageUrl={profile.imageUrl} username={profile.username} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              display: 'flex',
              color: '#FFDE37',
              textShadow: '0 0 10px #855F06, 0 0 10px #855F06, 0 0 10px #855F06, 0 0 10px #855F06'
            }}
          >
            {score}
          </div>
          <div style={{ fontSize: '32px' }}>frens score</div>
        </div>
      </div>
      <Grid
        poaps={{ logo: '/poap.png', number: poapsInCommon }}
        erc20={erc20inCommon.map((item) => ({ logo: `/${item.chain}.png`, number: item.value }))}
        nfts={nftsInCommon.map((item) => ({ logo: `/${item.chain}.png`, number: item.value }))}
        farcasterFollowings={{ logo: '/farcaster.png', number: farcasterFollowingsInCommon }}
      />
    </div>,
    {
      width: 600,
      height: 400,
      fonts: [
        {
          data: fontData,
          name: 'Hiruko',
          style: 'normal',
          weight: 400,
        },
        {
          data: scoreFontData,
          name: 'DKSmilingCat',
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
};
