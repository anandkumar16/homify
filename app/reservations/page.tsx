import Emptystate from "../components/Emptystate";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";

const reservationsPage = async ()=>{
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return <Emptystate 
        title="Unauthorized"
        subtitle="please login"
        />;
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if(reservations.length === 0){
        return <Emptystate 
        title="No reservations"
        subtitle="You have no reservations"
        />;
    }

    return (
        <div className="mx-10">
        <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
        />
        </div>
    )
}  

export default reservationsPage;