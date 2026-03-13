import React from 'react'
import PostCard from '../PostCard/PostCard';

export default function GetUserPosts({post}) {

  // console.log('getuserpost',post);
  
  
  return (
    <>
      <PostCard post={post} />
    </>
  )
}
