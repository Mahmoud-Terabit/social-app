import React, { useContext } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
 
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { Link, Links, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { nav } from 'framer-motion/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import NavButtons from '../NavButtons/NavButtons.';


export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function NavBarComponent() {

  let navigate = useNavigate()

  let {token, setToken} = useContext(UserContext)


  function LogOut() {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")
  }







  return (
    <>
  
        
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <Link to="/" className="font-bold text-inherit">ACME</Link>
      </NavbarBrand>

      <NavbarContent className="flex-1" justify="center">
        <NavButtons />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
      {token ? (<span className="w-4 h-4 rounded-full bg-green-500 inline-block mr-2"></span>) : (<span className="w-4 h-4 rounded-full bg-red-500 inline-block mr-2"></span>)}
      {token == null ?<>
        <Link to="/register" className="text-inherit">Register</Link>
        <Link to="/login" className="text-inherit">Login</Link>
      </> : <>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Craig Richmond"
              alt='Craig Richmond'
              size="sm"
              src="https://img.freepik.com/premium-psd/3d-cartoon-man-smiling-portrait-isolated-transparent-background-png-psd_888962-1570.jpg"
              />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">text@gmail.com</p>
            </DropdownItem>
            <DropdownItem><Link to="/profile">Profile</Link></DropdownItem>
            <DropdownItem onClick={LogOut} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </>}
        

      </NavbarContent>
    </Navbar>



    </>
  )
}
