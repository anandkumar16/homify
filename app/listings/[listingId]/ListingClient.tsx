"use client";

import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import { safeListing, SafeReservation, SafeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialdateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key : "selection"
}

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing : safeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient:React.FC<ListingClientProps> =({  
    listing,
    reservations = [],
    currentUser 
}) => {

    const loginModal = useLoginModal();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations.forEach((reservations) => {
            const range  = eachDayOfInterval({
                start: new Date(reservations.startDate),
                end: new Date(reservations.endDate)
            });
           dates = [...dates, ...range];
        });
        return dates;
    } ,[reservations]);

    const [isLoading , setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialdateRange);

    const onCreateReservation = useCallback(()=>{
        if(!currentUser){
            loginModal.Onopen();
            return;
        }
        setIsLoading(true); 

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(()=>{
            toast.success('Reservation created successfully');
            setDateRange(initialdateRange);
            router.push('/trips');
        })
        .catch(()=>{
            toast.error('Failed to create reservation');
        })
        .finally(()=>{
            setIsLoading(false);
        });
    },[totalPrice, dateRange, currentUser, listing?.id, router, loginModal]);

    useEffect(()=>{
        if(dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );
            if(dayCount && listing.price){
                setTotalPrice(dayCount * listing.price);
            }else{
                setTotalPrice(listing.price);
            }
        }
    },[dateRange, listing.price]);

    const category = useMemo(() => {
        return categories.find((item)=> item.label === listing.category);
    }, [listing.category]);


  return (
    <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
        <ListingHead
        title ={listing.title}
        imageSrc = {listing.imageSrc}
        locationValue = {listing.locationValue}
        id={listing.id}
        currentUser={currentUser}
        />
        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
        <ListingInfo
        user={listing.user}
        category={category}
        description={listing.description}
        roomCount={listing.roomCount}
        guestCount={listing.guestCount}
        bathroomCount={listing.bathroomCount}
        locationValue={listing.locationValue}     
        />
        <div className="order-first mb-10 md:order-last md:col-span-3">
            <ListingReservation
            price = {listing.price}
            totalPrice = {totalPrice}
            onChangeDate = {(value)=>setDateRange(value)}
            dateRange = {dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
            />
        </div>
        </div>
        </div>
    </div>
  )
}

export default ListingClient