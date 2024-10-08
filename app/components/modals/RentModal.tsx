"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modals";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../Input/CategoryInput"; 
import { useForm, FieldValues, RegisterOptions, UseFormRegisterReturn, SubmitHandler } from "react-hook-form";
import CountrySelect from "../Input/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Input/Counter";
import ImageUpload from "../Input/ImageUpload";
import Input from "../Input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";



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
    const router = useRouter();

    const [step , setStep] = useState(STEPS.CATEGORY);
   const [isloading , setIsloading] = useState(false);
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
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
      ssr:false
    }),[location]);
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

    const onSubmit : SubmitHandler<FieldValues> = (data) => {
      if(step !== STEPS.PRICE){
        return onNext();
      }
      setIsloading(true);

      axios.post('/api/listings', data)
      .then(() => {
        toast.success('Listing created ');
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        RentModal.Onclose();
      })
      .catch(() => {
        toast.error('An error occured');
      }).finally(() => {
        setIsloading(false);
      });
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
        <Map
        center={location?.latlng}
        />
        </div>
       )
    }


    if(step === STEPS.INFO){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
          title="share some basic info about your place"
          subtitle="what amenities do you have"
          />

          <Counter
          title="Guests"
          subtitle="how many guests do you allow"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
          />
          <hr/>
          <Counter
          title="Rooms"
          subtitle="how many rooms do you have"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
          />
          <hr/>
          <Counter
          title="Bathrooms"
          subtitle="how many Bathrooms do you have"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
          />
        </div>
      )
    }


    if( step === STEPS.IMAGES){
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
        title="Add some images of your place"
        subtitle="show  guests what your place looks like"
        />
        <ImageUpload
        value = {imageSrc}
        onChange={(value) => setCustomValue('imageSrc', value)}
        />
      </div>
    )
    }

    if(step === STEPS.DESCRIPTION){
      bodyContent=(
        <div className="flex flex-col gap-8">
          <Heading
          title="How would you describe your place"
          subtitle="short and sweet works best"
          />
        <Input
        id="title"
        label="Title"
        disabled={isloading}
        register={register}
        errors={errors}
        required
        />
      <hr/>
      <Input
        id="description"
        label="Description"
        disabled={isloading}
        register={register}
        errors={errors}
        required
        />
        </div>
      )
    }

    if(step == STEPS.PRICE){
      bodyContent=(
        <div className="flex flex-col gap-8">
          <Heading
          title="Now,set your price"
          subtitle="How much do you want to charge per night"
          />
          <Input
            id="price"
            label="Price"
            formatprice
            type="number"
            disabled={isloading}
            errors={errors}
            required
            register={register}
          />
        </div>
      )
    }


  return (
    <div>
        <Modal 
        isopen={RentModal.isOpen}
        onClose={RentModal.Onclose}
        onSubmit={handleSubmit(onSubmit)}
        actionlabel={actionlabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
        title="Airbnb your home" />
    </div>
  )
}

export default RentModal