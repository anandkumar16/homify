import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { BiSearch } from 'react-icons/bi';

function Search() {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByvalue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate'); 
  const guestCount = params?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) return getByvalue(locationValue as string)?.label; 
    return 'Anywhere';
  }, [getByvalue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) diff = 1; 
      return `${diff} days`;
    }
    return 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) return `${guestCount} guests`;
    return 'Add Guests';
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.Onopen}
      className='flex items-center border rounded-full shadow-md hover:shadow-lg transition cursor-pointer'>
      <div className='px-4 py-2 text-sm font-semibold border-r'>{locationLabel}</div>
      <div className='px-4 py-2 text-sm font-semibold border-r'>{durationLabel}</div>
      <div className='px-4 py-2 text-sm text-gray-600'>{guestLabel}</div>
      <div className='bg-rose-500 p-2 rounded-full text-white'>
        <BiSearch size={18} />
      </div>
    </div>
  );
}

export default Search;
