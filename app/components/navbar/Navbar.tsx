"use client";
import Search from './Search';
import Usermenu from './Usermenu';

import { SafeUser } from '@/app/types';
import Categories from './Categories';
import { useRouter } from 'next/navigation';
interface NavbarProps {
  currentUser: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  return (
  <>  
      <div className="bg-white shadow-sm z-10 px-4 py-4 h-20 flex items-center justify-between border-b-[1px] border-gray-200">
      <img onClick={()=>{router.push('/')}} src="/airbnblogo.webp" alt="Logo" className="w-32 h-20" />
      <Search />
      <Usermenu currentUser = {currentUser}/>   
       </div>
    <Categories/>
  </>
  );
}

export default Navbar;