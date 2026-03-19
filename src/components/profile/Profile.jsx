import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import ProfileInfo from '../ProfileInfo/ProfileInfo'
import PostCard from '../PostCard/PostCard'
import { div } from 'framer-motion/client'
import GetUserPosts from '../GetUserPosts/GetUserPosts'
import CreatPost from '../CreatPost/CreatPost'

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
    <div className="min-h-screen bg-[#f4f6f8]">
      <ProfileInfo data={data} userPostss={userPostss} />

      {userPostss && userPostss.length === 0 && (
        <div className="text-center text-2xl py-10 font-bold text-blue-500">
          No posts found
        </div>
      )}

      {userPostss && userPostss.length > 0 && (
        <div className="flex flex-col mx-auto sm:w-full md:w-[70%] px-4 md:px-0 items-center gap-6 pt-2 pb-10">
          {userPostss.map((post) => (
            <div key={post.id} className="w-full">
              <GetUserPosts post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
