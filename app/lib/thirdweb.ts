import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { BASE_NFT_COLLECTION_ADDRESS, CHAIN } from '../constants';

export const claimNFT = async (toAddress: string, profileName: string, image: Buffer) => {
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY!, CHAIN, {
    secretKey: process.env.THIRDWEB_SECRET_KEY,
  });

  const contract = await sdk.getContract<'nft-collection'>(
    BASE_NFT_COLLECTION_ADDRESS,
    'nft-collection',
  );

  await contract.mintTo(toAddress, {
    image,
    name: `are we frens ${profileName}?`,
    external_url: `https://warpcast.com/limone.eth`,
    description: `yes we are, regardless of what the image says\n\nyour friendly neighborhood lemon 🍋`,
  });
};
