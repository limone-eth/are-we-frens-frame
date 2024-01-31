import { join } from 'path';
import satori from 'satori';
import * as fs from 'fs';
import { TokenBlockchain } from './airstack/types';
import Avatar from '../components/avatar';
import { BASE_URL } from '../constants';

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

export const generateImageSvg = async (profile: Profile, score: string): Promise<string> => {
  return await satori(
    <div
      style={{
        backgroundColor: '#BDE86B',
        display: 'flex',
        flexDirection: 'column',
        padding: '3.5rem',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'space-around',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={BASE_URL + '/are-we-frens.png'} width={'145px'} height={'32px'} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '2rem',
          }}
        >
          <Avatar
            imageUrl={`${process.env.BASE_URL}/limone-pfp.png`}
            username="limone.eth"
            size="84px"
          />
          <div style={{ fontSize: '24px' }}>&</div>
          <Avatar imageUrl={profile.imageUrl} username={profile.username} size="84px" />
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
              flexDirection: 'row',
              alignItems: 'flex-end',
              gap: '0.5rem',
              color: '#FFDE37',
              textShadow: '0 0 10px #855F06, 0 0 10px #855F06, 0 0 10px #855F06, 0 0 10px #855F06',
            }}
          >
            {score}
            <span style={{ fontSize: '36px' }}>/10</span>
          </div>
          <div style={{ fontSize: '28px' }}>frens score</div>
        </div>
      </div>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '12px',
        }}
      >
        *based on nfts, poaps and farcaster followings in common
      </span>
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
