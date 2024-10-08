"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import CategoryBox from '../CategoryBox';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import Container from '../Container';

export const categories = [
    {
        label : 'Beach',
        icon: TbBeach,
        description :'property near the beach'

    },
    {
        label:'Windmill',
        icon: GiWindmill,
        description:'property near the windmill'
    },
    {
        label:'Modern',
        icon: MdOutlineVilla,
        description:'property is modern'
    },
    {
        label:'Countryside',
        icon: TbMountain,
        description:'property near countryside'
    },
    {
        label:'Pools',
        icon: TbPool,
        description:'property with pool'
    },
    {
        label:'Islands',
        icon: GiIsland,
        description:'property is on an Isalands'
    },
    {
        label:'Lake',
        icon: GiBoatFishing,
        description:'property near the lake'    
    }
    ,
    {
        label:'Skiing',
        icon: FaSkiing,
        description:'property has skiing activities'
    },
    {
        label:'Castles',
        icon: GiCastle,
        description:'property is in a castle'
    },
    {
        label:'Camping',
        icon: GiForestCamp,
        description:'property has camping activities'
    },
    {
        label:'Arctic',
        icon: BsSnow,
        description:'property is in a snow area'
    },
    {
        label:'Cave',
        icon: GiCaveEntrance,
        description:'property is in a cave'
    },
    {
        label:'Desert',
        icon: GiCactus,
        description:'property is in a desert'
    },
    {
        label:'Barns',
        icon: GiBarn,
        description:'property is in a barn'
    },
    {
        label:'Lux',
        icon: IoDiamond,
        description:'property is luxerious'
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage= pathname === '/';
    if(!isMainPage){
        return null;
    }
  return (

   <Container>
     <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map((item) => (
            <CategoryBox 
            key={item.label} 
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
            />
        ))}
    </div>
   </Container>
  )
}


export default Categories