import React, { useEffect, useMemo, useRef, useState } from 'react'
import RecentProducts from '../../components/RecentProducts/RecentProducts'
import CategorySlider from '../../components/CategorySlider/CategorySlider'
import MainSlider from './../../components/MainSlider/MainSlider';

export default function Home() {
  // const[counter1,setcounter1]=useState(0)
  // const[counter2,setcounter2]=useState(0)
  // useMemo(()=>{
  //   console.log("useMemo called");
  //   if(counter1%2==0){
  //     return "even"}
  //   else{
  //     return "odd"
  //   }
  // },[counter1])
  
  // let myinput=useRef()
  // useEffect(() => {
  //   console.log(myinput.current);
  //   myinput.current.focus();
  // },[])
  return (
    <>
    <MainSlider/>
    <CategorySlider/>
    <div className='container mx-auto mt-5'> 
    <RecentProducts/>
    </div>
    
    </>
  )
}


 