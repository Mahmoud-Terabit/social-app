import { Card, CardHeader, CardBody, Image, } from "@heroui/react";
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { data, useParams } from 'react-router-dom'

export default function PostDetails() {

    let {id} = useParams()
    console.log(id);
    

function getPostDetails() {

    return axios.get(`https://route-posts.routemisr.com/posts/${id}`,{headers:{
        token: localStorage.getItem("userToken")}})
}


let {data , isError , error , isFetching , isLoading} = useQuery({
    queryKey:["PostDetails"],
    queryFn:getPostDetails,
    select:(data)=>data?.data?.data?.post
})

console.log(data);





  if (isLoading) {
        return (<div className="loader mx-auto mt-[15%]"></div>)
  }
    if(isError){
    return (
      <h1 className="bg-red-500 text-center mt-10 text-white">{error.message}</h1>
    )
  }

  return (
    <>
      <div className="flex justify-center">
        <h1 className='text-blue-500 text-3xl font-bold my-5'>Post Details</h1>
      </div>
      {/* HTML version for reference */}
      {/* <div className="pb-0 py-3 px-4 items-start -mt-8 flex align-center gap-4">
        <div>
          <img alt="User avatar"
            className="w-12 h-12 rounded-full object-cover position-absolute border-white"
            src={data.user.photo}
          />
        </div>
        <div className="flex flex-col gap-1 pt-2">
          <p className="text-tiny uppercase font-bold text-white">{data.user.name}</p>
          <small className="text-default-500 ">{new Date(data.createdAt).toLocaleDateString("en-US",{
            month: "long",
            day: "numeric",
            year: "numeric"
          })}</small>
          <h4 className="font-bold text-large text-white">{data.title}</h4>
        </div>
      </div>
      <div className="overflow-visible py-2 flex items-center justify-center">
        <h4 className="text-white my-5">{data.body}</h4>
        <img alt="Card background"
          className="object-cover rounded-xl"
          src={data.image}
          width="370"
        />
      </div> */}


      <Card className="py-20 bg-gray-800 rounded-xl w-[40rem] mt-3 mx-auto">
        <CardHeader className=" pb-0 py-3 px-4 items-start -mt-8 flex align-center gap-4 ">
            <div className=''>
              <Image alt="User avatar"
                className="w-12 h-12 rounded-full object-cover position-absolute border-white"
                src={`${data.user.photo}`}
              />
            </div>
            <div className="flex flex-col gap-1 pt-2">
                <p className="text-tiny uppercase font-bold text-white">{data.user.name}</p>
              <small className="text-default-500 ">{new Date(data.createdAt).toLocaleDateString("en-US",{
                month: "long",
                day: "numeric",
                year: "numeric"
              })}</small>
              <h4 className="font-bold text-large text-white">{data.title}</h4>
            </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2 flex items-center justify-center">
            <h4 className="text-white my-5">{data.body}</h4>
            <Image alt="Card background"
              className="object-cover rounded-xl"
              src={`${data.image}`}
              width={370}
            />
        </CardBody>
      </Card>
    </>
  )
}
