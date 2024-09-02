import EmptyState from '../components/Emptystate';
import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import PropertiesClient from './PropertiesClient';

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return <EmptyState 
        title='Unauthorized'
       subtitle='Please Login' 
        />;
    }

    const listings = await getListings({
        userId: currentUser.id,   
    });

    if(listings.length === 0) {
        return <EmptyState 
        title='No Tproperties found'
       subtitle='You have no properties' 
        />;
    }
    return (
        <div className="mx-10">
        <PropertiesClient
        listings={listings}
        currentUser={currentUser}
        />
        </div>
    )
    
};


export default PropertiesPage;