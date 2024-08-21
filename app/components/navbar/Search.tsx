import React from 'react';
import { BiSearch } from 'react-icons/bi';

function Search() {
  return (
    <div className='flex items-center border rounded-full shadow-md hover:shadow-lg transition cursor-pointer'>
      <div className='px-4 py-2 text-sm font-semibold border-r'>Anywhere</div>
      <div className='px-4 py-2 text-sm font-semibold border-r'>Any Week</div>
      <div className='px-4 py-2 text-sm text-gray-600'>Add Guests</div>
      <div className='bg-rose-500 p-2 rounded-full text-white'>
        <BiSearch size={18}/>
      </div>
    </div>
  );
}

export default Search;