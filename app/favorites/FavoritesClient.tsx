import Heading from "../components/Heading";
import { safeListing, SafeUser } from "../types"
import ListingsCard from "../components/listings/ListingsCard";
import Container from "../components/Container";
interface FavoritesClientProps {
    listings: safeListing[];
    currentUser: SafeUser | null;
}



const FavoritesClient:React.FC<FavoritesClientProps> =({
    listings,
    currentUser
}) => {
  return (
    <Container>
        <Heading
        title="Favorites"
        subtitle="List of places you've favorited"
        />
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {listings.map((listing) => (
           
                <ListingsCard
                key = {listing.id}
                currentUser={currentUser}
                data={listing}
                />
           
        ))}
    </div>
    </Container>
  )
}

export default FavoritesClient