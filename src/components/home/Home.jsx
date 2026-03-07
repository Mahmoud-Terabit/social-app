import axios from 'axios';
import { head } from 'framer-motion/client';
import React, { useEffect, useState } from 'react'
import PostCard from '../PostCard/PostCard';
import { is } from 'zod/locales';
import { useQuery } from '@tanstack/react-query';
import Lodingsnipner1 from '../LodingComponents/Lodingsnipner1/Lodingsnipner1';


export default function Home() {

//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(null);

// async function getAllPosts() {
//   try {
//     setIsLoading(true);
//     let {data} = await axios.get('https://route-posts.routemisr.com/posts' , {
//       headers: {
//         token: localStorage.getItem("userToken")
//       }
//     });
//     console.log(data);
//     setPosts(data.data.posts);
    

//   } catch (error) {
//     console.error('Error fetching posts:', error.message);
//     setIsError('Failed to fetch posts. Please try again later. ' + error);
//     // setIsError('Failed to fetch posts. Please try again later. ' + error.message);


//   } finally {
//     setIsLoading(false);
//   }

// }

// useEffect(()=>{
  
//   getAllPosts();

// },[])

// if (isError) {
//   return (
//     <h1 className="text-red-500 text-center mt-10">{isError}</h1>
//   )
// }

// if(isLoading==true) {
//   return (
//     <div className="loader mx-auto"></div>
//   )
// }


function getAllPosts() {
  return axios.get('https://route-posts.routemisr.com/posts' , {
    headers: {
      token: localStorage.getItem("userToken")
    }
  })
}

  let {data , isLoading , isError , error } = useQuery({
    queryKey: ['getAllPosts'],
    queryFn: getAllPosts,
    staleTime: 10000 , // 10 seconds
    refetchInterval: 20000 , // 20 seconds
    refetchOnWindowFocus: true,
    select:(data)=>data?.data?.data?.posts
  })
  
  
  if(isLoading){
    return (
      <Lodingsnipner1 />
    )
  }
  if(isError){
    return (
      <h1 className="bg-red-500 text-center mt-10 text-white">{error.message}</h1>
    )
  }



  return (
    <>
        <h1 className='text-3xl font-bold text-center mt-10 bg-amber-400'>Welcome to the Home Page</h1>

    <div className='flex mx-auto w-[50%] items-center justify-center mt-10'>
      <div className='flex flex-wrap gap-4 justify-center'>
        {/* {data.map((post) => (<PostCard key={post.id} post={post} />))} */}
        <div className='flex flex-col w-full gap-8'>
        {data.map((post) => (<div key={post.id} className="flex flex-col gap-5"><PostCard post={post} /></div>))}
      </div>
      </div>
    </div>

    </>
  )
}
