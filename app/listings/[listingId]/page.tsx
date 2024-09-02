import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/Emptystate';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';
import ClientOnly from '@/app/components/ClientOnly';

interface IParams {
    listingId?: string;  
}

const Page = async ({ params }: { params: IParams }) => {
    if (!params.listingId) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return (
            <ClientOnly>
                <EmptyState />;
            </ClientOnly>
        )
    }

    return (
       <ClientOnly>
         <div className='mx-10'>
            <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
            />
        </div>
        </ClientOnly>
    );
}

export default Page;



