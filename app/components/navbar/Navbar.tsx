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
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm px-4 py-4 h-auto flex flex-col sm:flex-row items-center justify-between border-b-[1px] border-gray-200 z-30">
        <div className="w-full sm:w-auto flex justify-between items-center mb-2 sm:mb-0">
          <img 
            onClick={() => { router.push('/') }}
            src="/lugo.jpeg" 
            alt="Logo" 
            className="w-28 sm:w-40 h-12 sm:h-16 cursor-pointer"
          />
          <div className="sm:hidden">
            <Usermenu currentUser={currentUser} />
          </div>
        </div>
        
        <div className="w-full sm:w-auto mb-2 sm:mb-0 sm:mx-4">
          <Search />
        </div>
        
        <div className="hidden sm:block">
          <Usermenu currentUser={currentUser} />
        </div>
      </div>
      
      <div className="h-20"></div> 


      <Categories />
    </Container>
  );
}

export default Navbar;