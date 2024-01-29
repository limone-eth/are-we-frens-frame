interface GridItem {
  logo: string;
  number: number;
}

interface GridProps {
  erc20: GridItem[];
  nfts: GridItem[];
  poaps: GridItem;
  farcasterFollowings: GridItem;
}

const Grid: React.FC<GridProps> = ({ erc20, nfts, poaps, farcasterFollowings }) => {
  return (
    <div
      style={{
        display: 'flex',
        columnCount: 2,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '2rem',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '28px' }}>erc20</div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
            {erc20.map((item, index) => (
              <div
                key={index}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <img
                  src={`${process.env.BASE_URL}/${item.logo}`}
                  alt="logo"
                  style={{ width: '36px', height: '36px' }}
                />
                <span style={{ marginTop: '4px', fontSize: '24px' }}>{item.number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '28px', marginRight: '28px', blockSize: '1' }}>nfts </div>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
            {nfts.map((item, index) => (
              <div
                key={index}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <img
                  src={`${process.env.BASE_URL}/${item.logo}`}
                  alt="logo"
                  style={{ width: '36px', height: '36px' }}
                />
                <span style={{ marginTop: '4px', fontSize: '24px' }}>{item.number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '28px', marginRight: '6px' }}>poaps</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/*<img
              src={`${process.env.BASE_URL}/${poaps.logo}`}
              alt="logo"
              style={{ width: '36px', height: '36px' }}
            />*/}
          <span style={{ marginTop: '4px', fontSize: '24px' }}>{poaps.number}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            fontSize: '28px',
            marginRight: '6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          fc followings <br style={{ fontSize: '20px' }}>(in common)</br>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/*<img
          src={`${process.env.BASE_URL}/${farcasterFollowings.logo}`}
          alt="logo"
          style={{ width: '36px', height: '36px' }}
          />*/}
          <span style={{ marginTop: '4px', fontSize: '24px' }}>{farcasterFollowings.number}</span>
        </div>
      </div>
    </div>
  );
};

export default Grid;
