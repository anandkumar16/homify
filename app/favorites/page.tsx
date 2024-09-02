import Emptystate from "../components/Emptystate";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";
import ClientOnly from "../components/ClientOnly";


const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
    if(listings.length === 0){
        return (
            <ClientOnly>
                <Emptystate 
                title="No favorites found"
                subtitle="Looks like you haven't favorited any listings yet."
                />
            </ClientOnly>
        );
    }
   return(
    <ClientOnly>
    <div className="mx-10">
        <FavoritesClient
        listings={listings}
        currentUser={currentUser}
        />
    </div>
    </ClientOnly>
   )
}

export default ListingPage;