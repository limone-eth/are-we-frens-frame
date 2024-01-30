import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { BASE_NFT_COLLECTION_ADDRESS, CHAIN } from '../constants';

const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY!, CHAIN, {
  secretKey: process.env.THIRDWEB_SECRET_KEY,
});

export const claimNFT = async (toAddress: string, profileName: string, image: Buffer) => {
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

export const alreadyClaimed = async (address: string) => {
  const contract = await sdk.getContract(BASE_NFT_COLLECTION_ADDRESS, 'nft-collection');
  const balance = await contract.balanceOf(address);
  return balance.toNumber() > 0;
};
