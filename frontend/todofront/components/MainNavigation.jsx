import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function MainNavigation() {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  )
}

export default MainNavigation
