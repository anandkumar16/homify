"use client"

interface avatarprops{
  src: string | null | undefined
}
const Avatar : React.FC<avatarprops> = ({src}) => {
  return (
    <img src= {src || "/avavtar.png" } alt="User" className=" hidden md:block w-10 h-7 rounded-full" />
  );
}

export default Avatar;