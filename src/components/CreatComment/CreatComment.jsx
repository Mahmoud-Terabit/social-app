import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { use, useState } from 'react'
import toast from 'react-hot-toast';


export default function CreatComment(props) {

  const post = props.post;
  const [commentBodyText, setCommentBodyText] = useState('')
  const [commentBodyImage, setCommentBodyImage] = useState('')
  const [commentBodyImageSrc, setCommentBodyImageSrc] = useState('')


  function craftingComment(formData) {
    return axios.post(`https://route-posts.routemisr.com/posts/${post.id}/comments`, formData, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    })
  }

  const queryClientComment = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ["addUserComment"],
    mutationFn: craftingComment,
    onMutate: () => {
      const x = toast.loading("Posting")
      return { x }
    },
    onSuccess: (context) => {
      toast.dismiss(context.x)
      toast.success("Comment Added Successfully")
      clear()
      queryClientComment.invalidateQueries({
        queryKey: ["getAllPosts"]
      })
      queryClientComment.invalidateQueries({
        queryKey: ["GetMyPosts"]
      })
    },
    onError: (error) => {
      toast.error("Failed to Add Post. Please try again later. " + error.message)
    },
  })
  function handelAddComment() {
    if (isPending) return;

    const formData = new FormData()
    if (commentBodyText) {
      formData.append("content", commentBodyText)
    }
    if (commentBodyImage) {
      formData.append("image", commentBodyImage)
    }
    mutate(formData)

  }

  function handleChangePhoto(e) {
    console.log(e.target.files[0]);
    const file = e.target.files[0]

    if (file) {
      setCommentBodyImageSrc(URL.createObjectURL(file))
      setCommentBodyImage(file)
    }
  }

  function clear() {
    setCommentBodyImageSrc(null)
    setCommentBodyImage('')
    setCommentBodyText('')
  }


  return (
    <>

      <div className="flex flex-col bg-[#f4f6f8] p-4 justify-center items-center font-sans">

        {/* الحاوية الرئيسية لقسم التعليقات */}
        <div className="w-full max-w-3xl flex flex-col gap-4">

          {/* الكارت السفلي: مربع كتابة التعليق */}
          <div className="flex gap-4 items-start w-full">
            {/* الصورة الشخصية (Avatar) */}
            <div className="shrink-0 mt-1">
              <img
                src="https://img.freepik.com/premium-psd/3d-cartoon-man-smiling-portrait-isolated-transparent-background-png-psd_888962-1570.jpg"
                alt="User avatar"
                className="w-11 h-11 rounded-full object-cover shadow-sm"
              />
            </div>

            {/* حاوية الإدخال (Input Area) */}
            <div className="flex-1 bg-[#f4f6f9] bg-white border border-gray-200 rounded-[20px] p-3 flex flex-col transition-colors focus-within:border-blue-300 focus-within:bg-white focus-within:shadow-sm">

              {/* حقل النص */}
              <textarea
                className="w-full resize-none bg-white border-none rounded-2xl text-[15px] text-gray-700 placeholder-gray-500 mb-2 px-1 focus:outline-none focus:ring-0 focus:border-transparent"
                placeholder="Comment..."
                // rows={3}
                value={commentBodyText}
                onChange={(e) => setCommentBodyText(e.target.value)}
              ></textarea>

              {/* شريط الأدوات السفلي (أيقونات وزر الإرسال) */}
              <div className="flex justify-between items-center px-1">

                {/* الأيقونات اليسرى (صورة، إيموجي) */}
                <div className="flex gap-3 text-gray-400">
                  <div className="hover:text-gray-600 transition-colors">
                    <label className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,video/*"
                        onChange={handleChangePhoto}

                      />
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" fill="#10b981" />
                        <path d="M21 15L16 10L5 21" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-medium">Photo</span>
                    </label>
                  </div>
                  <button className="hover:text-gray-600 transition-colors hidden">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>

                {/* زر الإرسال */}
                <button onClick={handelAddComment} className="w-[42px] h-[42px] bg-[#9ebff9] hover:bg-[#86aff8] text-white rounded-full flex items-center justify-center transition-colors shadow-sm">
                  <svg className="w-5 h-5 -ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>

              </div>
            </div>
          </div>

        </div>
        <div className=''>
          <img src={commentBodyImageSrc} width={800} alt="" className='rounded-2xl' />
        </div>
      </div>



      {/* <div className="px-4 pb-3">
            <div className="mt-2 flex items-start gap-3">
              <img
                src={post?.user?.photo}
                alt="User"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1">
                <textarea
                  placeholder="Write a comment..."
                  className="w-full p-2 text-[14px] text-gray-700 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-200"
                  rows={3}
                  value={commentBodyText}
                  onChange={(e) => setCommentBodyText(e.target.value)}
                />
                <div className="mt-2 flex justify-end">
                  <button className="px-4 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-[13px] font-semibold transition-colors">
                    send
                  </button>
                </div>
              </div>
            </div>
          </div> */}

    </>
  )
}
