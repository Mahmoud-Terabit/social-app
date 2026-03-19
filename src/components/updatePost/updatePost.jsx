import axios from 'axios'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function UpdatePost({ post, setUpdateClick }) {
  console.log("UpdatePost component received props:", { post, setUpdateClick });

  const queryClient = useQueryClient()

  const [postBody, setPostBody] = useState(post?.body || "")

  function updatePostData(formData) {
    return axios.put(`https://route-posts.routemisr.com/posts/${post?.id}`, formData, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: updatePostData,
    onMutate: () => {
      const x = toast.loading("Updating post...")
      return { x }
    },
    onSuccess: (context) => {
      toast.dismiss(context.x)
      toast.success("Post updated successfully")
      queryClient.invalidateQueries({
        queryKey: ["getAllPosts"]
      })
      queryClient.invalidateQueries({
        queryKey: ["GetMyPosts"]
      })
      queryClient.invalidateQueries({
        queryKey: ["postDetails"]
      })
      setUpdateClick(false)
    },
    onError: () => {
      toast.error("Failed to update post")
    }
  })

  function handleUpdatePost() {
    if (isPending) return;
    
    if (!postBody.trim()){
      toast.error("Post cannot be empty")
      return;
    }
    
    const formData = new FormData()
    if(postBody){
      formData.append("body", postBody)
    }
    console.log("Post data being sent:", { body: postBody });
    mutate(formData)
  }
















  // const queryClient = useQueryClient()
  // const [postBody, setPostBody] = useState(post?.body || '')

  // function updatePostData(formData) {
  //   return axios.put(`https://route-posts.routemisr.com/posts/${post?.id}`, formData, {
  //     headers: {
  //       token: localStorage.getItem("userToken")
  //     }
  //   })
  // }

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["updatePost"],
  //   mutationFn: updatePostData,
  //   onMutate: () => {
  //     const x = toast.loading("Updating post...")
  //     return { x }
  //   },
  //   onSuccess: (context) => {
  //     toast.dismiss(context.x)
  //     toast.success("Post updated successfully")
  //     queryClient.invalidateQueries({
  //       queryKey: ["getAllPosts"]
  //     })
  //     queryClient.invalidateQueries({
  //       queryKey: ["GetMyPosts"]
  //     })
  //     queryClient.invalidateQueries({
  //       queryKey: ["postDetails"]
  //     })
  //     setUpdateClick(false)
  //   },
  //   onError: (error) => {
  //     toast.error("Failed to update post. Please try again later. " + error.message)
  //   }
  // })

  // function handleUpdatePost() {
  //   if (isPending) return;

  //   if (!postBody.trim()) {
  //     toast.error("Post cannot be empty")
  //     return;
  //   }

  //   const formData = new FormData()
  //   if (postBody) {
  //     formData.append("body", postBody)
  //   }
  //   console.log("Post data being sent:", { body: postBody });
  //   mutate(formData)
  // }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Edit Post</h3>

        <textarea
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
          placeholder="Edit your post..."
          className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
          rows={4}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => setUpdateClick(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdatePost}
            disabled={isPending}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isPending 
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  )
}
