import Emptystate from "../components/Emptystate";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationClient from "./ReservationClient";
import ClientOnly from "../components/ClientOnly";

const reservationsPage = async ()=>{
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <Emptystate 
        title="Unauthorized"
        subtitle="please login"
        />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });

    if(reservations.length === 0){
        return (
            <ClientOnly>
                <Emptystate 
        title="No reservations"
        subtitle="You have no reservations"
        />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
        <div className="mx-10">
        <ReservationClient
        reservations={reservations}
        currentUser={currentUser}
        />
        </div>
        </ClientOnly>
    )
}  

export default reservationsPage;