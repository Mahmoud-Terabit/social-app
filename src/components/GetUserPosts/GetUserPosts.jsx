import React from 'react'
import PostCard from '../PostCard/PostCard';

export default function GetUserPosts({post}) {

  // console.log('getuserpost',post);
  
  
  return (
    <>
    {post ? <PostCard post={post} /> : <div className='text-center text-2xl font-bold text-red-500'>No posts found</div>}
      {/* <PostCard post={post} /> */}
    </>
  )
}
