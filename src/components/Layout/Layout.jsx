import React from 'react'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <NavBar/>
      <div className=' mx-auto overflow-hidden mt-20 mb-20'>
      <Outlet/>

      </div>
      <Footer/>
    </>
  )
}
