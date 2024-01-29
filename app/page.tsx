import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: ['ofc 🍋', "idk let's see 👀", "who da fk are u again!?🙄"],
  image: 'https://are-we-frens-frame.vercel.app/base-img.png',
  post_url: 'https://are-we-frens-frame.vercel.app/api/frame',
});

export const metadata: Metadata = {
  title: 'are-we-frens-frame.vercel.app',
  description: 'are we frens?',
  openGraph: {
    title: 'are-we-frens-frame.vercel.app',
    description: 'are we frens?',
    images: ['https://are-we-frens-frame.vercel.app/base-img.png'],
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
