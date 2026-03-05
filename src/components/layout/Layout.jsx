import React from 'react'
import NavBarComponent from '../navbarcomponent/NavBarComponent'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
    <NavBarComponent />
    <Outlet />
  </>

}
