import React from 'react'
import {Card, CardHeader, CardBody, Image, CardFooter} from "@heroui/react";
import SingleComment from '../SingleComment/SingleComment';
import { Link } from 'react-router-dom';

export default function PostCard(props) {
  const post = props.post;
  // console.log(post.topComment);
  
  
  return (
    <>
    <Card className="py-20 bg-gray-800 rounded-xl w-[40rem] mt-3 mx-auto">
      
        <CardHeader className=" pb-0 py-3 px-4 items-start -mt-8 flex align-center gap-4 ">
          <div className=''>
            <Image alt="User avatar"
            className="w-12 h-12 rounded-full object-cover position-absolute border-white"
            src={`${post.user.photo}`}
          />
          </div>
          <div className="flex flex-col gap-1 pt-2">
              <p className="text-tiny uppercase font-bold text-white">{post.user.name}</p>
            <small className="text-default-500 ">{new Date(post.createdAt).toLocaleDateString("en-US",{
              month: "long",
              day: "numeric",
              year: "numeric"
            })}</small>
            <h4 className="font-bold text-large text-white">{post.title}</h4>
          </div>
        </CardHeader>
      <Link to={`PostDetails/${post.id}`}>
        <CardBody className="overflow-visible py-2 flex items-center justify-center">
          <h4 className="text-white my-5">{post.body}</h4>
          <Image alt="Card background"
            className="object-cover rounded-xl"
            src={`${post.image}`}
            width={370}
          />
        </CardBody>
      </Link>

      <CardFooter className='flex flex-col text-white border-t border-gray-700 pt-4'>
        <div className='flex gap-10 mb-4'>
          <div>
            <span className='text-white'>Likes</span>
          </div>
          <div>
            <span>{post?.commentsCount}</span>
            <span className='text-white'>Comments</span>
          </div>
          <div>
            <span className='text-white'>Shares</span>
          </div>
        </div>
        <SingleComment  comment={post?.topComment} />
      </CardFooter>

    </Card>
    </>
  )
}
