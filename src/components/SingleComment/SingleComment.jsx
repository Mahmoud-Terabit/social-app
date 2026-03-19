import React, { use, useState } from 'react'
import img6 from '../../assets/img6.jpg'
import UpdateComment from '../updateComment/updateComment'
import { Delete } from 'lucide-react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, ButtonGroup } from "@heroui/react";
import DelComment from '../DelComment/DelComment';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';



export const EditDocumentIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DeleteDocumentIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.07 5.23c-1.61-.16-3.22-.28-4.84-.37v-.01l-.22-1.3c-.15-.92-.37-2.3-2.71-2.3h-2.62c-2.33 0-2.55 1.32-2.71 2.29l-.21 1.28c-.93.06-1.86.12-2.79.21l-2.04.2c-.42.04-.72.41-.68.82.04.41.4.71.82.67l2.04-.2c5.24-.52 10.52-.32 15.82.21h.08c.38 0 .71-.29.75-.68a.766.766 0 0 0-.69-.82Z"
        fill="currentColor"
      />
      <path
        d="M19.23 8.14c-.24-.25-.57-.39-.91-.39H5.68c-.34 0-.68.14-.91.39-.23.25-.36.59-.34.94l.62 10.26c.11 1.52.25 3.42 3.74 3.42h6.42c3.49 0 3.63-1.89 3.74-3.42l.62-10.25c.02-.36-.11-.7-.34-.95Z"
        fill="currentColor"
        opacity={0.399}
      />
      <path
        clipRule="evenodd"
        d="M9.58 17a.75.75 0 0 1 .75-.75h3.33a.75.75 0 0 1 0 1.5h-3.33a.75.75 0 0 1-.75-.75ZM8.75 13a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";






export default function SingleComment({ comment, postId ,post }) {

  const [showUpdateModal, setShowUpdateModal] = useState(false)





  const queryClientComment = useQueryClient();

  const deletingComment = () => {
    return axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${comment?._id}`, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    });
  };


  function handleDeleteComment() {
    console.log("ggggggg",comment.post);
    console.log("Deleting comment:", comment);
    console.log("Deleting post ID:", postId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
        // Swal.fire({
        //   title: "Deleted!",
        //   text: "Your comment has been deleted.",
        //   icon: "success"
        // });
      }
    });
  }

  const {mutate} = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: deletingComment,
    onMutate:()=>{
      const x = toast.loading("Deleting Comment...")
      return { x }
    },
    onSuccess:(context)=>{
      toast.dismiss(context.x)
      toast.success("Comment deleted successfully")
      queryClientComment.invalidateQueries({ queryKey: ["GetAllComments"] })
      queryClientComment.invalidateQueries({ queryKey: ["PostDetails"] })
      Swal.fire({
        title: "Deleted!",
        text: "Your comment has been deleted.",
        icon: "success"
      });
    },
    onError:(error)=>{
      toast.error(error.response.data.message)
    },
  })


  if (!comment) {
    return <>
      {/* <p className="text-black">No comments available</p> */}
      {/* الكارت العلوي: حالة عدم وجود تعليقات (Empty State) */}
      <div className="bg-white border border-gray-100 rounded-[20px] p-6 flex flex-col items-center justify-center shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
        {/* أيقونة المحادثة */}
        <div className="w-14 h-14 bg-[#f0f5ff] rounded-full flex items-center justify-center mb-5 text-[#1e5eff]">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </div>

        {/* النصوص */}
        <h2 className="text-[22px] font-black text-gray-900 mb-2">No comments yet</h2>
        <p className="text-[15px] text-gray-500 font-medium">Be the first to comment.</p>
      </div>
    </>
  }

  //const { commentCreator, content, createdAt } = comment;
  const { commentCreator, content, createdAt, image } = comment;

  //   const avatar = commentCreator.photo || img6;
  //const avatar = commentCreator.photo ? commentCreator.photo : img6;
  const avatar = commentCreator?.photo ? commentCreator.photo : img6;

  return (
    <>
      <div className='flex items-start gap-3'>
        <div>
          <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
        </div>
        <div className='flex flex-col gap-2 bg-white w-full p-1 rounded-lg'>
          <div className='flex justify-between items-start'>
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
            {/* ------------------- update الشكل القديم -------------------*/}
            {/* <button
              onClick={() => setShowUpdateModal(true)}
              className="text-gray-500 hover:text-blue-600 hover:bg-gray-100 p-1 rounded transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button> */}
            <Dropdown>
      <DropdownTrigger>
        {/* <Button variant="bordered" className="text-4xl flex justify-content-center align-items-center hover:bg-gray-100">
          <p className="mb-5">...</p></Button> */}
        <Button
          isIconOnly
          variant="light"
          className="min-w-10 h-10 w-10 p-0 flex items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
          aria-label="Post menu"
        >
          <span className="inline-flex items-center justify-center leading-none text-[30px] font-bold select-none mb-2">⋯</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown menu with description" variant="faded">
        {/* <DropdownItem
          key="new"
          description="Create a new file"
          shortcut="⌘N"
          startContent={<AddNoteIcon className={iconClasses} />}
        >
          New file
        </DropdownItem>
        <DropdownItem
          key="copy"
          description="Copy the file link"
          shortcut="⌘C"
          startContent={<CopyDocumentIcon className={iconClasses} />}
        >
          Copy link
        </DropdownItem> */}
        <DropdownItem
          onPress={() => setShowUpdateModal(true)}
          key="edit"
          showDivider
          description="Allows you to edit the comment"
          shortcut="⌘⇧E"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Edit comment
        </DropdownItem>

        <DropdownItem
          // onClick={(e)=>{e.stopPropagation(),e.preventDefault(),console.log('delee',post.id);}}
          // onClick={(e)=>{e.stopPropagation(),e.preventDefault(),console.log('delee',post.id);}}
          onPress={handleDeleteComment}
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the comment"
          shortcut="⌘⇧D"
          startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
        >
          Delete comment
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
                
          </div>
          <p className="text-gray-700 ml-2">{content}</p>
          {image && (
            <div className="mt-2 ml-2">
              <img
                src={image}
                alt="Comment attachment"
                className="max-h-64 rounded-xl object-cover border border-gray-200"
              />
            </div>
          )}
        </div>
      </div>

      {/* Update Comment Modal */}
      {showUpdateModal && (
        <UpdateComment comment={comment} postId={postId} onClose={() => setShowUpdateModal(false)} />
      )}
    </>
  );
}
