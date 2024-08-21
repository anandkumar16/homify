"use client";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modals";
import { useMemo, useState } from "react";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";

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
          {item.label}
        </div>
      ))}
      </div>
      </div>
    );


  return (
    <div>
        <Modal 
        isopen={RentModal.isOpen}
        onClose={RentModal.Onclose}
        onSubmit={RentModal.Onclose}
        actionlabel={actionlabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
        title="Airbnb your home" />
    </div>
  )
}

export default RentModal