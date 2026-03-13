import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import ProfileInfo from '../ProfileInfo/ProfileInfo'
import PostCard from '../PostCard/PostCard'
import { div } from 'framer-motion/client'
import GetUserPosts from '../GetUserPosts/GetUserPosts'

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

    
    const GetMyPosts = () => {
      return axios.get(`https://route-posts.routemisr.com/users/${data?.id}/posts` , {
        headers: {
          token: localStorage.getItem("userToken")
        }
      })
    }
    
    // console.log('profileeeee',data);
    

    const {data:userPostss} = useQuery({
        queryKey:["GetMyPosts"],
        queryFn: GetMyPosts,
        select:(userPostss)=>userPostss?.data?.data?.posts
    })
    // console.log("userPostss",data);
    



  return (
    <>
      <ProfileInfo data={data} userPostss={userPostss} />
      {userPostss?.map((post)=>{
        return <>
        <div className='flex w-full justify-center align-self-center bg-[#f4f6f8] overflow-hidden'  key={post.id}>
          <div className='flex py-4 sm:w-full md:w-[68%]'>
            {/* <PostCard post={post} /> */}
            <GetUserPosts post={post} />
          </div>
        </div>

        </> 
      })}
    </>
  )
}
