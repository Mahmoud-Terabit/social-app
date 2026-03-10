import { p } from 'framer-motion/client';
import React from 'react'
import img6 from '../../assets/img6.jpg'

export default function SingleComment({ comment }) {


    // console.log(comment);
    

  if (!comment) {
    return <p className="text-black">No comments available</p>;
  }

  const { commentCreator, content, createdAt } = comment;

//   const avatar = commentCreator.photo || img6;
    const avatar = commentCreator.photo ? commentCreator.photo : img6;

  return (
    <>
    <div className='flex items-start gap-3'>
      
      <div>
          <img src={commentCreator.photo} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
      </div>
      <div className='flex flex-col gap-2 bg-white w-full p-1 rounded-lg'>
        <div className='flex'>
          <div className='ml-2'>
            <h4 className="font-bold text-black">{commentCreator.name}</h4>
            <p className="text-slate-600 text-xs">
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <p className="text-gray-700 ml-2">{content}</p>
      </div>
    </div>
        
    </>
  );
}
