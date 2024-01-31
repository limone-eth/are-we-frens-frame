import Image from 'next/image';
import { readImage } from '../../lib/redis';

export default async function ImageAddress({ params }: { params: { address: string } }) {
  const image = await readImage(params.address);
  if (!image) {
    return <>Not found</>;
  }
  return (
    <>
      <div>
        <Image
          src={`data:image/jpeg;base64,${image?.toString('base64')}`}
          alt="base-img"
          width={1000}
          height={650}
        />
      </div>
    </>
  );
}
