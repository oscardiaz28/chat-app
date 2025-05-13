import React, { useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Camera, Image, Mail, User} from 'lucide-react'

export const ProfilePage = () => {

  const {authUser, isUpdatingProfile, updateProfile} = useAuthStore()

  const imgRef = useRef(null)

  const handleProfileChange = (event) => {
    const file = event.target.files[0]
    if(file){
      updateProfile(file)
    }
  }

  return (
    <div className='min-h-screen pt-20'>
      
      <div className='w-full max-w-2xl mx-auto p-4 py-8'>

        <div className='bg-base-300 rounded-xl p-6 space-y-8'>

          {/* head section */}
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your profile information</p>
          </div>

          {/* avatar upload section */}
          <div className='flex flex-col items-center gap-4'>

            <div className='relative'>
              <img src={authUser.profilePic || "/images/perfil.webp"} alt="" className='size-32 rounded-full object-cover border-4' />

              <label htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-primary hover:scale-105
                p-2 rounded-full cursor-pointer transition-all duration-200
                ${isUpdatingProfile ? "pointer-events-none animate-pulse" : "" }`}
              >
                <Camera className='size-5 text-white/70' />
                <input type="file"
                ref={imgRef}
                className='hidden'
                id='avatar-upload'
                accept='image/*'
                onChange={handleProfileChange}
                disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className='text-sm text-zinc-400'>
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo" }
            </p>
          </div>

          {/* Info section */}
          <div className='space-y-6'>
            <div className='space-y-1.5'>
                <div className='text-sm text-zinc-400 flex items-center gap-2'>
                  <User className='size-4' />
                  Full Name
                </div>
                <p className='px-4 py-2.5 bg-base-200 rounded-lg border border-zinc-700'>{authUser?.fullName}</p>
            </div>
            <div className='space-y-1.5'>
            <div className='text-sm text-zinc-400 flex items-center gap-2'>
                  <Mail className='size-4' />
                  Email
                </div>
                <p className='px-4 py-2.5 bg-base-200 rounded-lg border border-zinc-700'>{authUser?.email}</p>
            </div>
          </div>

          <div className='mt-6 p-6'>
              <h2 className='text-lg font-medium mb-4' >Account Information</h2>
              <div className='space-y-3 text-sm'>

                <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>

                <div className='flex items-center justify-between py-2 border-b border-zinc-700'>
                  <span>Account Status</span>
                  <span className='text-green-500'>Active</span>
                </div>

              </div>
          </div>

        </div>
      </div>

    </div>
  )

}
