import React from 'react';

interface AvatarProps {
  imageUrl: string;
  username: string;
  size: `${string}px`;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, username, size }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <img
        src={imageUrl}
        alt={username}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #000000',
        }}
      />
      <span style={{ marginTop: '4px', fontSize: '20px' }}>{username}</span>
    </div>
  );
};

export default Avatar;
