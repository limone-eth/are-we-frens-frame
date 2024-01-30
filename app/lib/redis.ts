import { kv } from '@vercel/kv';

export const setImage = async (image: Buffer, address: string) => {
  return await kv.set(address, image.toString('base64'));
};

export const readImage = async (address: string) => {
  const base64Image = await kv.get(address);
  if (!base64Image) {
    return null;
  }
  return Buffer.from(base64Image as string, 'base64');
};

export const setClaimed = async (address: string) => {
  return await kv.set(address, 'claimed');
};

export const hasClaimed = async (address: string) => {
  const claimed = await kv.get(address);
  console.log(claimed);
  return claimed && claimed === 'claimed';
};
