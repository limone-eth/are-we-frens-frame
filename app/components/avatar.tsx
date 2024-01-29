import React from 'react';

interface AvatarProps {
  imageUrl: string;
  username: string;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, username }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <img
        src={imageUrl}
        alt={username}
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '2px solid #000000',
        }}
      />
      <span style={{ marginTop: '4px', fontSize: '16px' }}>{username}</span>
    </div>
  );
};

export default Avatar;
