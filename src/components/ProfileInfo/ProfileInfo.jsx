import React from 'react'

export default function ProfileInfo(props) {


    // console.log("profileInfo",props.data);
    


  return (
    <>
      <div className="min-h-screen  bg-[#f4f6f8] p-4 md:p-8 font-sans flex justify-center items-start">
      
      {/* الحاوية الرئيسية */}
      <div className="w-full max-w-5xl bg-white rounded-[24px] shadow-sm overflow-hidden border border-gray-100">
        
        {/* الغلاف (Cover Photo) */}
        <div className="relative h-56 bg-gradient-to-r from-[#1a2f4c] via-[#33567a] to-[#73a0c8]">
          <button className="absolute top-4 right-4 bg-gray-900/40 hover:bg-gray-900/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-md flex items-center gap-2 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Add cover
          </button>
        </div>

        {/* القسم الأبيض الداخلي (يتداخل قليلاً مع الغلاف) */}
        <div className="bg-white rounded-t-[24px] -mt-10 relative px-6 md:px-10 pb-10 w-[95%] mx-auto">
          
          {/* الجزء العلوي: الصورة الشخصية، الاسم، والإحصائيات */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-3 pt-8">
            
            {/* معلومات المستخدم (الصورة والنصوص) */}
            <div className="flex flex-col md:flex-row gap-5 items-start">
              <div className="relative shrink-0">
                <img
                  src="https://img.freepik.com/premium-psd/3d-cartoon-man-smiling-portrait-isolated-transparent-background-png-psd_888962-1570.jpg" 
                  alt="Craig Richmond"
                  className="w-[104px] h-[104px] rounded-full border-[6px] border-white object-cover bg-white shadow-sm"
                />
              </div>
              <div className="mt-2 md:mt-0 pt-2">
                <h1 className="text-2xl font-black text-gray-900 mb-1 tracking-tight">{props?.data?.name}</h1>
                <p className="text-gray-500 text-[15px] font-medium mb-2">@{props?.data?.username}</p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f5ff] text-[#1e5eff] text-[11px] font-bold">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                  Route Posts member
                </span>
              </div>
            </div>

            {/* إحصائيات المتابعين أعلى اليمين */}
            <div className="flex gap-3 w-full md:w-auto">
              <div className="flex-1 md:w-32 py-4 px-2 border border-gray-100 rounded-[14px] text-center shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Followers</p>
                <p className="text-2xl font-black text-gray-900">{props?.data?.followersCount}</p>
              </div>
              <div className="flex-1 md:w-32 py-4 px-2 border border-gray-100 rounded-[14px] text-center shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Following</p>
                <p className="text-2xl font-black text-gray-900">{props?.data?.followingCount}</p>
              </div>
              <div className="flex-1 md:w-32 py-4 px-2 border border-gray-100 rounded-[14px] text-center shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Bookmarks</p>
                <p className="text-2xl font-black text-gray-900">{props?.data?.bookmarksCount}</p>
              </div>
            </div>

          </div>

          {/* الجزء السفلي: قسم About وإحصائيات المنشورات */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* قسم About (يأخذ مساحة عمودين) */}
            <div className="lg:col-span-2 border bg-[#F8FAFC] p-6 rounded-[14px] border border-gray-200 rounded-[14px] p-6 shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
              <h3 className="text-[13px] font-bold text-gray-900 mb-4">About</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[13px] text-gray-500 font-medium">
                  <svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <p>{props?.data?.email}</p>
                </div>
                <div className="flex items-center gap-3 text-[13px] text-gray-500 font-medium">
                  <svg className="w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                  Active on Route Posts
                </div>
              </div>
            </div>

            {/* قسم إحصائيات المنشورات (يأخذ مساحة عمود واحد) */}
            <div className="flex flex-col gap-4">
              <div className="border bg-[#eff6ff] border-gray-300 rounded-[14px] p-5 shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
                <p className="text-[10px] font-bold text-[#355b96] uppercase tracking-widest mb-1">My Posts</p>
                <p className="text-2xl font-black text-gray-900">{props?.userPostss?.length}</p>
              </div>
              <div className="border bg-[#eff6ff] border-gray-300 rounded-[14px] p-5 shadow-[0_2px_8px_rgb(0,0,0,0.02)]">
                <p className="text-[10px] font-bold text-[#355b96] uppercase tracking-widest mb-1">Saved Posts</p>
                <p className="text-2xl font-black text-gray-900">0</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
    </>
  )
}
