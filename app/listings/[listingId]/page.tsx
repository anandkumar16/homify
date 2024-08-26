import getListingById from '@/app/actions/getListingById';
import EmptyState from '@/app/components/Emptystate';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ListingClient from './ListingClient';
import getReservations from '@/app/actions/getReservations';

interface IParams {
    listingId?: string;  
}

const Page = async ({ params }: { params: IParams }) => {
    if (!params.listingId) {
        return <EmptyState />;
    }

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return <EmptyState />;
    }

    return (
        <div>
            <ListingClient
            listing={listing}
            currentUser={currentUser}
            reservations={reservations}
            />
        </div>
    );
}

export default Page;



