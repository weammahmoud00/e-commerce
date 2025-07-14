import React, { useEffect, useState } from 'react'
// import { Spinner } from "flowbite-react";
import Spinner  from '../..//components/Spinner/Spinner';


import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
export default function Brands() {
    const[products,setProducts]=useState(null);

const getBrands= async( )=>{
        return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
    }
let {isError,data,isLoading,isFetched,isFetching,error}=useQuery({
    queryKey:"brand",
    queryFn:getBrands,
    select:(data)=>{
        return data?.data?.data
    }
})


    // const getBrands= async( )=>{
    //     await axios.get("https://ecommerce.routemisr.com/api/v1/brands").then(({data})=>{
    //         console.log(data.data);
    //         setProducts(data.data);
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // }
    // useEffect(() => {
    //     getBrands();
    // },[])

    // if(isLoading){
    //     return <Spinner aria-label="Default status example" />;
    // }
  return (
    <>
    {isLoading ? <Spinner  /> :
    
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
    {data?.map((brand)=>{return(
        <div key={brand._id} className='flex flex-wrap items-center justify-center p-4 border border-gray-300 rounded bg-white hover:shadow-lg hover:shadow-green-500/70 transition-all duration-300 ease-in-out'>
            <img src={brand.image}  />
            <h2>{brand.name}</h2>
        </div>
      
    )
})}
</div>
    }
    </>
)
}
