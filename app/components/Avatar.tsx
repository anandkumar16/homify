import React from 'react';
interface avatarprops{
  src: string | null | undefined
}
const Avatar : React.FC<avatarprops> = ({src}) => {
  return (
    <img src= {src || "/avavtar.png" } alt="User" className="w-7 h-7 rounded-full" />
  );
}

export default Avatar;