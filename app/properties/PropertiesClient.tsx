"use client";
import { useRouter} from "next/navigation";
import Heading from "../components/Heading";
import { safeListing, SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingsCard from "../components/listings/ListingsCard";

interface PropertiesClientProps {
    listings: safeListing[];
    currentUser: SafeUser | null;
}

const PropertiesClient:React.FC<PropertiesClientProps> =({
    listings,
    currentUser
}) => {
    const router = useRouter();
    const [deleting, setDeletingId] = useState('');
    const onCancel = useCallback((id:string)=>{
        setDeletingId(id);
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success('Listings deleted');
            router.refresh();
        })
        .catch(()=>{
            toast.error('Failed to delete listings');
        })
        .finally(()=>{
            setDeletingId('');
        });
    },[router]);
    return (
        <div>
          <div>
            <Heading
              title="Properties"
              subtitle="List of your properties"
            />
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
              <ListingsCard
                key={listing.id}
                data={listing}
               
                actionId={listing.id}
                onAction={onCancel}
                disabled={deleting === listing.id}
                actionLabel="Delete Property"
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
      );
      
    }
export default PropertiesClient;