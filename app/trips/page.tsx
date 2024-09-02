import EmptyState from '../components/Emptystate';
import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import TripsClient from './TripsClient';

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return <EmptyState 
        title='Unauthorized'
       subtitle='Please Login' 
        />;
    }

    const reservations = await getReservations({
        userId: currentUser.id,   
    });

    if(reservations.length === 0) {
        return <EmptyState 
        title='No Trips found'
       subtitle='You have no upcoming trips' 
        />;
    }
    return (
        <div className="mx-10">
        <TripsClient
        reservations={reservations}
        currentUser={currentUser}
        />
        </div>
        
    )
    
};


export default TripsPage;