import Image from 'next/image';
import { readImage } from '../../lib/redis';
import { fetchNFTImage } from '../../lib/airstack/get-nft-image';

export default async function ImageAddress({ params }: { params: { address: string } }) {
  const imageUrl = await fetchNFTImage(params.address);
  if (!imageUrl) {
    return <>Not found</>;
  }
  return (
    <>
      <div>
        <Image src={imageUrl} alt="base-img" width={1000} height={650} />
      </div>
    </>
  );
}
