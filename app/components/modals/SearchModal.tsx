"use client";

import useSearchModal from '@/app/hooks/useSearchModal';
import Modal from './Modals'
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../Input/CountrySelect';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';

enum STEPS{
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

function SearchModal() {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();


    const [location, setLocation] = useState<CountrySelectValue>();
    const [step , setStep]  = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange,setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'),{
      ssr: false
    }), [location]);


    const onBack = useCallback(()=>{
      setStep((value) => value - 1);
    },[]);

    const onNext = useCallback(()=>{
      setStep((value) => value + 1);
    },[]);


    const onSubmit = useCallback( async ()=>{
      if(step !== STEPS.INFO){
        return onNext();
      }

      let currentQuery = {};

      if(params){
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery:any = {
        ...currentQuery,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount,      

      }
      if(dateRange.startDate){
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }

      if(dateRange.endDate){
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }

      const url  = qs.stringify({
        url:'/',
        query: updatedQuery
      } ,{skipNull: true});
    
      setStep(STEPS.LOCATION);
      searchModal.Onclose();
      router.push(url);

    },[step,searchModal,location,guestCount,roomCount,bathroomCount,dateRange ,onNext,params]);


    const octionLabel = useMemo(()=>{
      if(step === STEPS.INFO){
        return 'Search';
      }
      return 'Next';
    },[step]);


    const secondaryActionLabel = useMemo(()=>{
      if(step === STEPS.LOCATION){
        return undefined;
      }
      return 'Back';
    },[step]);


    const bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
        title='Where do you want to go?'
        subtitle='find the perfect location'
        />

        <CountrySelect
        value={location}
        onChange={(value)=>
        setLocation(value as CountrySelectValue
        )}
        />
        <hr/>
        <Map center={location?.latlng}/>
      </div>
    )

    if(step === STEPS.DATE){
     const  bodyContent=(
        <div>
          
        </div>
      )
    }


  return (
    <Modal
    isopen={searchModal.isOpen}
    onClose={searchModal.Onclose}
    onSubmit={searchModal.Onopen}
    title="Filters"
    actionlabel="Search"
    body={bodyContent}
    />
  )
}

export default SearchModal;