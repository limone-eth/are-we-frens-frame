import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { BASE_URL } from './constants';

const frameMetadata = getFrameMetadata({
  buttons: ['ofc 🍋', "idk let's see 👀", 'who da fk are u again sry!?🙄'],
  image: `${BASE_URL}/base-img.png`,
  post_url: `${BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'are we frens?',
  description: 'seriously, are we?',
  openGraph: {
    title: 'are we frens?',
    description: 'seriously, are we?',
    images: [`${BASE_URL}/base-img.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>are we frens?</h1>
    </>
  );
}
