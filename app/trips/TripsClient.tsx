"use client";
import { useRouter} from "next/navigation";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingsCard from "../components/listings/ListingsCard";
import Container from "../components/Container";

interface TripsClientProps {
    reservations: SafeReservation[];
    currentUser: SafeUser | null;
}

const TripsClient:React.FC<TripsClientProps> =({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deleting, setDeletingId] = useState('');
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success('Reservation cancelled');
            router.refresh();
        })
        .catch(()=>{
            toast.error('Failed to cancel reservation');
        })
        .finally(()=>{
            setDeletingId('');
        });
    },[router]);
    return (
        <Container>
          <div>
            <Heading
              title="Trips"
              subtitle="where you've been and where you're going"
            />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {reservations.map((reservation) => (
              <ListingsCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deleting === reservation.id}
                actionLabel="Cancel reservation"
                currentUser={currentUser}
              />
            ))}
          </div>
        </Container>
      );
      
    }
export default TripsClient