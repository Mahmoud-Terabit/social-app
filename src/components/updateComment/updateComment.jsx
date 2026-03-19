import axios from 'axios'
import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export default function UpdateComment({ comment, postId, onClose }) {

    const [commentBody, setCommentBody] = useState(comment?.content || '')
    console.log("commmmment",comment);
    

    const queryClientCommentUpdate = useQueryClient()

    function updateCommentData(formData) {
        return axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${comment._id}`, formData, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
    }
    
    const {mutate , isPending} =useMutation({
        mutationKey:["updateComment"],
        mutationFn:updateCommentData,
        onMutate: ()=>{
            const x = toast.loading("Updating comment...")
            return { x }
        },
        onSuccess:(context)=>{
            toast.dismiss(context.x)
            toast.success("Comment updated successfully")
            queryClientCommentUpdate.invalidateQueries({
                queryKey: ["getAllPosts"]
            })
            queryClientCommentUpdate.invalidateQueries({
                queryKey: ["getAllComments"]
            })
            queryClientCommentUpdate.invalidateQueries({
                queryKey: ["postDetails"]
            })
            queryClientCommentUpdate.invalidateQueries({
                queryKey: ["GetMyPosts"]
            })
            onClose()
        },
        onError:(error)=>{
            toast.error("Failed to update comment. Please try again later. " + error.message)
        }
    })
    
    // const { mutate, isPending } = useMutation({
    //     mutationKey: ["updateComment"],
    //     mutationFn: updateCommentData,
    //     onMutate: () => {
    //         const x = toast.loading("Updating comment...")
    //         return { x }
    //     },
    //     onSuccess: (context) => {
    //         toast.dismiss(context.x)
    //         toast.success("Comment updated successfully")
    //         queryClient.invalidateQueries({
    //             queryKey: ["getAllPosts"]
    //         })
    //         queryClient.invalidateQueries({
    //             queryKey: ["getAllComments"]
    //         })
    //         onClose()
    //     },
    //     onError: (error) => {
    //         toast.error("Failed to update comment. Please try again later. " + error.message)
    //     },
    // })

    function handleUpdateComment() {
        console.log('UpdateComment Props:', { comment, postId, onClose });
        // if (isPending) return;
        if(isPending)return;
        // if (!commentBody.trim()) {
            //     toast.error("Comment cannot be empty")
            //     return;
            // }
            // mutate()
            
            if(!commentBody.trim()){
                toast.error("Comment cannot be empty")
                return;
            }

            // const formData = new FormData()
            // if(commentBody){
            //     formData.append("content", commentBody)
            // }
            // console.log("FormData being sent:", !!formData);
            // console.log("Comment body:", commentBody);
            const dataToSend = {
                content: commentBody
            };
            console.log("Data being sent:", dataToSend);
            mutate(dataToSend)
        }
        
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h3 className="text-xl font-bold mb-4">Edit Comment</h3>

                <textarea
                    value={commentBody}
                    onChange={(e) => setCommentBody(e.target.value)}
                    placeholder="Edit your comment..."
                    className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                    rows={4}
                />

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateComment}
                        // className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors'
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