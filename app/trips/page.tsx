import EmptyState from '../components/Emptystate';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';
import ClientOnly from '../components/ClientOnly';

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                 <EmptyState 
        title='Unauthorized'
       subtitle='Please Login' 
        />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id,   
    });

    if(reservations.length === 0) {
        return(
            <ClientOnly>
            <EmptyState 
            title='No Trips found'
           subtitle='You have no upcoming trips' 
            />;
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
        <div className="mx-10">
        <TripsClient
        reservations={reservations}
        currentUser={currentUser}
        />
        </div>
        </ClientOnly>
    )
    
};


export default TripsPage;