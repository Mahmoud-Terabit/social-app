import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import SingleComment from '../SingleComment/SingleComment';

export default function GetAllComponents(props) {

  console.log(props.id);

  function GetAllComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${props.id}/comments?page=1&limit=10`,{headers:{
      token: localStorage.getItem("userToken")
    }})
  }

 let {data , isLoading , isFetching , isError , error} =useQuery({

    queryKey:["GetAllComments"],
    queryFn:GetAllComments,
    // queryFn:()=>{
    //   return axios.get(`https://route-posts.routemisr.com/post/${props.id}/comments`,{headers:{
    //     token: localStorage.getItem("userToken")
    //   }})
    // }
    select:(data)=>data?.data?.data?.comments 
  })
  
  console.log(data);
  

  return (
    <>
      <h1 className='text-white text-2xl font-bold my-5'>All Comments</h1>

      <div className='my-2'>
        {data?.map((comment)=><SingleComment comment={comment}/>)}
      </div>
    </>
  )
}
