import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';


export default function Categories() {
  const [categories , setCategories] = useState(null)
  function getAllCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        console.log("All Categories:", response?.data?.data);
        setCategories(response?.data?.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }
  useEffect(() => {
    getAllCategories();
  }, []);
  
  
  return (
    <>
      {categories ? (
        <div className='my-8 flex flex-wrap justify-center items-center mx-auto gap-9'>
          {categories.map((cat)=>{
            return(
              <div className="product border border-gray-300 rounded bg-white ">
              <Link to="/" >
              <div key={cat._id} className='w-full relative   hover:shadow-lg hover:shadow-green-500/70 transition-all duration-300 ease-in-out'>
                <img src={cat.image} alt={cat.name} className='w-[350px] h-[400px] object-cover rounded'/>
                <h3 className='absolute bottom-0 left-0 right-0 bg-white bg-opacity-50 text-emerald-700  text-3xl text-center py-4'>{cat.name}</h3>
              </div>
              </Link>
              </div>
            )
          })}
        </div>
      ) : <Spinner/>
      }
    </>
  )
}
