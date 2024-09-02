import Emptystate from "../components/Emptystate";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";


const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();
    if(listings.length === 0){
        return (
            <div>
                <Emptystate 
                title="No favorites found"
                subtitle="Looks like you haven't favorited any listings yet."
                />
            </div>
        );
    }
   return(
    <div className="mx-10">
        <FavoritesClient
        listings={listings}
        currentUser={currentUser}
        />
    </div>
   )
}

export default ListingPage;