import EmptyState from '../components/Emptystate';
import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import PropertiesClient from './PropertiesClient';
import ClientOnly from '../components/ClientOnly';

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
<EmptyState 
        title='Unauthorized'
       subtitle='Please Login' 
        />;
            </ClientOnly>
        ) 
    }

    const listings = await getListings({
        userId: currentUser.id,   
    });

    if(listings.length === 0) {
        return (
            <ClientOnly>
        <EmptyState 
        title='No Tproperties found'
       subtitle='You have no properties' 
        />;
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
        <div className="mx-10">
        <PropertiesClient
        listings={listings}
        currentUser={currentUser}
        />
        </div>
        </ClientOnly>
    )
    
};


export default PropertiesPage;