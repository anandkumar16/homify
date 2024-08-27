"use client";

import toast from "react-hot-toast";
import axios from "axios";
import { useCallback , useState } from "react";
import { SafeReservation , SafeUser} from "../types";
import Heading from "../components/Heading";
import ListingsCard from "../components/listings/ListingsCard";
import { useRouter } from "next/navigation";


interface ReservationClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser;
}

const ReservationClient:React.FC<ReservationClientProps>=({
    reservations,
    currentUser 
})=>{
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation cancelled");
            router.refresh();
        })
        .catch(()=>{
            toast.error("something went wrong");
        })
        .finally(()=>{
            setDeletingId('');
        })
    } , [router]);
  return (
    <div>
        <Heading 
        title="Reservations"
        subtitle="Booking on your properties"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation)=>(
            <ListingsCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
            />
        ))}
        </div>
    </div>
  )
}

export default ReservationClient