"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modals";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../Input/CategoryInput"; 
import { useForm, FieldValues } from "react-hook-form";
import CountrySelect from "../Input/CountrySelect";
import Map from "../Map";


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES= 3,
  DESCRIPTION=4,
  PRICE=5
}


function RentModal() {
    const RentModal = useRentModal();

    const [step , setStep] = useState(STEPS.CATEGORY);
   
    const  {
      register,
      handleSubmit,
      setValue,
      watch,
      formState:{
        errors,
      },
      reset
    }  = useForm< FieldValues>({
      defaultValues:{
        category:'',
        location:null,
        guestCount:1,
        roomCount:1,
        bathroomCount:1,
        imagesSrc:'',
        price:1,
        title:'',
        description:'',
      }
    });

    const category = watch('category');
    const location = watch('location');

    const setCustomValue = (id:string , value:any) => {
      setValue(id, value,{
        shouldValidate:true,
        shouldDirty:true,
        shouldTouch:true
      });
    }
    const onBack = () => {
      setStep((prev) => prev - 1);
    };

    const onNext = () => {
      setStep((prev) => prev + 1);
    }

    const actionlabel = useMemo(() => {
      if(step === STEPS.PRICE){
        return 'create';
      }
      return 'next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.CATEGORY){
        return 'undefined';
      }
      return 'back';
    }, [step]);

    let bodyContent = (
      <div className='flex flex-col gap-8'>
      <Heading
      title = "which of these best describe your place?"
      subtitle="pick a category"
      />
      <div className="grid grid-cols-1  md:grid-cols-2  gap-3 max-h-[50vh] overflow-y-auto">
      {categories.map((item)=>(
        <div key={item.label} className="col-span-1">
         <CategoryInput
          onclick={(category) => setCustomValue('category', category)}
          selected={category === item.label}
          label={item.label}
          icon={item.icon}
         />
        </div>
      ))}
      </div>
      </div>
    );

    if(step === STEPS.LOCATION){
       bodyContent=(
        <div className="flex flex-col gap-8">
        <Heading
        title="Where is your place located"
        subtitle="Help guests find your place"
        />
        <CountrySelect
        value={location}
        onChange={(value) => setCustomValue('location', value)}
        />
        <Map/>
        </div>
       )
    }

  return (
    <div>
        <Modal 
        isopen={RentModal.isOpen}
        onClose={RentModal.Onclose}
        onSubmit={onNext}
        actionlabel={actionlabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
        title="Airbnb your home" />
    </div>
  )
}

export default RentModal