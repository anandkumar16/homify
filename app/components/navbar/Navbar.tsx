"use client";
import Search from './Search';
import Usermenu from './Usermenu';


import { SafeUser } from '@/app/types';
import Categories from './Categories';
import { useRouter } from 'next/navigation';
import Container from '../Container';
interface NavbarProps {
  currentUser: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();
  return (
    <Container>
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-4 h-20 flex items-center justify-between border-b-[1px] border-gray-200">
        <img 
        onClick={() => { router.push('/') }}
         src="/airbnblogo.webp" 
         alt="Logo" 
         className="w-40 h-16 cursor-pointer"
          />
        <Search />
        <Usermenu currentUser={currentUser} />
      </div>
      <div className="h-20"></div> 
      <Categories />
    </Container>
  );
}

export default Navbar;