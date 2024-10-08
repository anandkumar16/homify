export const dynamic = 'force-dynamic';

import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";

import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import Emptystate from "./components/Emptystate";
import ListingsCard from "./components/listings/ListingsCard";

interface HomeProps {
  searchParams: IListingsParams;
}


const Home = async({searchParams} : HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <Emptystate showReset />;
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
      <div
        className="pt-10 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8"
      >
        {listings.map((listing) => {
        return(
            <div>
             <ListingsCard
              key={listing.id} 
              currentUser={currentUser}
              data={listing}
            />
            </div>
        )  
      })}          
      </div>
      </Container>
    </ClientOnly>
  );
}


export default Home;