import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, ButtonGroup } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { q } from "framer-motion/client";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import UpdatePost from '../updatePost/updatePost';


{/* ---------------- delete post --------------- */}


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

export default function PostMenu({ post }) {

  const queryClient = useQueryClient();


  const [updateClick, setUpdateClick] = useState(false)
  

  const deletingPost = () => {
    return axios.delete(`https://route-posts.routemisr.com/posts/${post?.id}`, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    });
  };



  function handleDelete() {
    console.log("Deleting post:", post.id);

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
        Swal.fire({
          title: "Deleted!",
          text: "Your post has been deleted.",
          icon: "success"
        });
      }
    });
  }


  

  const { mutate } = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletingPost,
    onMutate: () => {
      const x = toast.loading("Deleting Post...")
      return { x }
    },
    onSuccess: (context) => {
      toast.dismiss(context.x)
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["GetMyPosts"] })
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] })
    },
    onError: (error) => {
      toast.error("Failed to delete post. Please try again later. " + error.message);
    },
  })

  const iconClasses = "text-xl text-default-500 pointer-events-none shrink-0";

  return (
    <>
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
        onPress={()=>setUpdateClick(true)}
          key="edit"
          showDivider
          description="Allows you to edit the post"
          shortcut="⌘⇧E"
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Edit post
        </DropdownItem>

        <DropdownItem
          // onClick={(e)=>{e.stopPropagation(),e.preventDefault(),console.log('delee',post.id);}}
          // onClick={(e)=>{e.stopPropagation(),e.preventDefault(),console.log('delee',post.id);}}
          onPress={handleDelete}
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the post"
          shortcut="⌘⇧D"
          startContent={<DeleteDocumentIcon className={cn(iconClasses, "text-danger")} />}
        >
          {/* <button onClick={(e) => { e.stopPropagation(),e.preventDefault(),console.log('delee',post.id) }}>Delete file</button> */}
          Delete post
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

    {updateClick && <UpdatePost post={post} setUpdateClick={setUpdateClick}/>}
    </>
  );
}
