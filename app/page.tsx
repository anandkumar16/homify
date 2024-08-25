import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import Emptystate from "./components/Emptystate";
import ListingsCard from "./components/listings/ListingsCard";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return <Emptystate showReset />;
  }

  return (
    <>
      <div
        className="pt-10 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8"
      >
        {listings.map((listing) => {
        return(
            <div>
              <ListingsCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
              />
            </div>
        )  
      })}

        
      </div>
    </>
  );
}
