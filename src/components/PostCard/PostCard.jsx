import React, { useState } from 'react'
import {Card, CardHeader, CardBody, Image, CardFooter} from "@heroui/react";
import SingleComment from '../SingleComment/SingleComment';
import { Link } from 'react-router-dom';
import PostMenu from '../PostMenu/PostMenu';
import CreatComment from '../CreatComment/CreatComment';

export default function PostCard(props) {
  const post = props.post;
  console.log("PostCard post data:", post);
  console.log("User data from localStorage:", JSON.parse(localStorage.getItem("user") || "{}"));
  const [showCommentBox, setShowCommentBox] = useState(false);

  
  return (
    <>
  <div className="flex w-full">
      <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        
        {/* 1. Header Section */}
        <div className="p-4 flex justify-between items-start">
          <div className="flex gap-3">
            <img 
              src="https://img.freepik.com/premium-psd/3d-cartoon-man-smiling-portrait-isolated-transparent-background-png-psd_888962-1570.jpg" 
              alt="User" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-[#050505] text-[17px]">{post?.user?.name}</h3>
              <div className="flex items-center gap-1 text-[14px] text-gray-500">
                <span>{new Date(post?.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric"
                })}</span>
                {/* Public Icon */}
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.5a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"/>
                  <path d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                <span className="font-medium">Public</span>
              </div>
            </div>
          </div>
          {/* Menu - Only show for user's own posts */}
          {/* {post?.user?._id === JSON.parse(localStorage.getItem("user"))?._id && (
            <PostMenu post={post} />
          )} */}
          {/* <PostMenu post={post} /> */}
        </div>

        {/* 2. Content Section */}
        <div className="flex flex-col gap-4 px-4 pb-4 items-center justify-center">
          <h4 className="text-black font-bold my-5">{post?.body}</h4>
          <Image alt="Card background"
            className="object-cover rounded-xl w-full max-w-[900px]"
            src={`${post?.image}`}
            width={900}
          />
        </div>

        {/* 3. Stats Section (Likes, Shares, Comments) */}
        <div className="px-4 py-2 flex items-center justify-between border-t border-gray-100 text-gray-500 text-[14px]">
          <div className="flex items-center gap-1">
            <div className="bg-blue-500 rounded-full p-1 shadow-sm">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                <path d="M20 13h-4V5a2 2 0 00-2-2H9a2 2 0 00-2 2v8H3v8h17v-8z" />
              </svg>
            </div>
            <span>{post?.likesCount}</span>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1 font-medium italic">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92z"/></svg>
              {post?.sharesCount} shares
            </div>
            <span className="font-medium italic">{post?.commentsCount} comments</span>
            {/*------------ postdetails ------------*/}
            <Link to={`/postdetails/${post?.id}`} className="text-blue-600 font-bold hover:underline">View details</Link>
          </div>
        </div>

        {/* 4. Action Buttons */}
        <div className="mx-4 border-t border-gray-200 flex py-1">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md text-gray-600 font-semibold transition-colors text-[15px]">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
            Like
          </button>
          <button
            onClick={() => setShowCommentBox((prev) => !prev)}
            className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md text-gray-600 font-semibold transition-colors text-[15px]"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>
            Comment
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 rounded-md text-gray-600 font-semibold transition-colors text-[15px]">
            <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" fill="none" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share
          </button>
        </div>

        {showCommentBox && (<CreatComment post={post}/>)}

        {/* 5. Comments Section */}
        <div className="p-3 rounded-b-2xl border-t border-gray-100 m-2">
           <div className="flex flex-col gap-3 p-2 bg-[#f3f7fc] rounded-xl border border-blue-100/50">
             
             {/* Single Comment Card */}
             <div className="flex flex-col gap-3 px-2 pb-1 pt-3">
                {/* <div className=" p-4 rounded-2xl shadow-sm border border-gray-300 flex-1">
                </div> */}
                  <div>
                      <span className="text-[12px] font-bold text-gray-500 px-2 uppercase tracking-tight">Top Comment</span>
                  </div>
                  {/* top Comment*/}
                  {/* <p className="text-[14px] text-gray-700 mt-1"><SingleComment  comment={post?.topComment} /></p> */}
                  <p className="text-[14px] text-gray-700 mt-1"><SingleComment comment={post?.topComment} postId={post?.id} /></p>
             </div>
             
             {/* <button className="text-blue-600 font-bold text-[14px] px-2 text-left hover:underline w-fit">
               View all comments
             </button> */}
           </div>
        </div>

      </div>
    </div>
    
    </>
  )
}
