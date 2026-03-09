import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import ProfileInfo from '../ProfileInfo/ProfileInfo'

export default function profile() {


  function GetMyProfile(){
    return axios.get('https://route-posts.routemisr.com/users/profile-data' , {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
  }

    const {data , isLoading, isError , error , isFetching} = useQuery({
        queryKey:["GetMyProfile"],
        queryFn: GetMyProfile,
        select:(data)=>data?.data?.data?.user
    })

    console.log(data);
    


  return (
    <>
      <ProfileInfo data={data} />
    </>
  )
}
