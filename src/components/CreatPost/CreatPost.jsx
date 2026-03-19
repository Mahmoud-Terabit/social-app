import React, { useState } from 'react'
{/*مكتبة من ريأكت للايكونز for icons from react (lucide-react) */ }
import { Globe, Image, Smile, Send } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CreatPost() {
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    const [imageSrc, setImageSrc] = useState('')
    const queryClient = useQueryClient()

    function GetMyProfile(){
        return axios.get('https://route-posts.routemisr.com/users/profile-data' , {
          headers: {
            token: localStorage.getItem("userToken")
          }
        })
      }

    const { data: userData } = useQuery({
        queryKey:["GetMyProfile"],
        queryFn: GetMyProfile,
        select:(userData)=>userData?.data?.data?.user
    })

    function AddPost(formData) {
        return axios.post('https://route-posts.routemisr.com/posts', formData, {headers: {
                token: localStorage.getItem("userToken")
            }
        })
    }

    const { mutate, isPending } = useMutation({
        mutationKey: ["AddPost"],
        mutationFn: AddPost,
        onMutate: () => {
            const x = toast.loading("Adding Post...")
            return { x }
        },
        onSuccess: (context) => {
            toast.dismiss(context.x)
            toast.success("Post Added Successfully")
            clear()
            queryClient.invalidateQueries({
                queryKey: ["getAllPosts"]
            })
        },
        onError: (error) => {
            toast.error("Failed to Add Post. Please try again later. " + error.message)
        },

    })

    function handleChangePhoto(e) {
        console.log(e.target.files[0]);
        const file = e.target.files[0]

        if (file) {
            setImageSrc(URL.createObjectURL(file))
            setImage(file)
        }
    }

    function handleAddPost() {
        if (isPending) return;

        // Validation: Check if there's content (text or image)
        if (!body.trim() && !image) {
            toast.error("Please add some content to your post (text or image)");
            return;
        }

        console.log("gi");
        const formData = new FormData()
        if (body) {
            formData.append("body", body)
        }
        if (image) {
            formData.append("image", image)
        }
        mutate(formData)
        console.log("FormData being sent:", !!formData);

    }
    function clear() {
        setImageSrc(null)
        setImage('')
        setBody('')
    }



    return (
    <>

    <div className="flex w-full">
                {/* Container الرئيسي */}
                <div className="w-full  bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                    {/* Header: الصورة والاسم */}
                    <div className="p-4 pb-2 flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                            {/* هنا نضع الصورة الرمزية */}
                            <img
                                src="https://img.freepik.com/premium-psd/3d-cartoon-man-smiling-portrait-isolated-transparent-background-png-psd_888962-1570.jpg"
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{userData?.name}</h3>
                            <button className="flex items-center gap-1 mt-1 px-2 py-0.5 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                                <Globe size={14} className="text-gray-600" />
                                <span className="text-sm font-medium text-gray-600">Public</span>
                                <span className="text-[10px] text-gray-500">▼</span>
                            </button>
                        </div>
                    </div>

                    {/* Input Area: منطقة النص */}
                    {/* resize-none  مش بتبقى حاطة شكل التيكست الفليكس انك تسحبو لتحت*/}
                    <div className="px-4 py-2">
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="What's on your mind, Ainsley?"
                            className="w-full h-32 p-4 text-xl text-gray-500 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-100  placeholder-gray-400"
                        />
                    </div>

                    <div>
                        <img src={imageSrc} alt="" />
                    </div>

                    <hr className="mx-4 border-gray-100" />

                    <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-wrap gap-4">

                            {/* زرار الصور كـ Input File */}
                            <label className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*,video/*"
                                    // onChange={(e) => console.log(e.target.files[0])} 
                                    onChange={handleChangePhoto}
                                />
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" fill="#10b981" />
                                    <path d="M21 15L16 10L5 21" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-medium">Photo</span>
                            </label>

                            {/* زرار المشاعر كـ Input Text */}
                            <div className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition-all focus-within:ring-1 focus-within:ring-orange-200">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#fb923c" strokeWidth="2" />
                                    <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Feeling/activity"
                                    className="bg-transparent border-none outline-none font-medium w-20 sm:w-28 placeholder-gray-600 text-sm focus:ring-0 p-0"
                                />
                            </div>

                        </div>

                        {/* زرار النشر */}
                        <button
                            onClick={handleAddPost}
                            disabled={isPending}
                            className={`flex items-center gap-2 px-4 sm:px-8 py-2.5 rounded-xl font-bold shadow-md shadow-blue-200 transition-all active:scale-95 text-sm sm:text-base
                              ${isPending ? "bg-blue-400 cursor-not-allowed opacity-70" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                        >
                            {isPending ? "Posting..." : "Post"}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>

                </div>
    </div>

    </>
    )
}
