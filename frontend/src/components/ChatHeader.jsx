import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { X } from 'lucide-react'

export const ChatHeader = () => {

    const {selectedUser, setSelectedUser} = useChatStore()
    const {onlineUsers} = useAuthStore()

  return (
    <div className='p-2.5 border-b border-base-300'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                {/* Avatar */}
                <div className='avatar'>
                    <div className='size-10 rounded-full relative'>
                        <img src={selectedUser.profilePic || "/images/perfil.webp"} alt="" />
                    </div>
                </div>
                {/* User info */}
                <div>
                    <h3 className='font-medium'>{selectedUser.fullName}</h3>
                    <p className='text-sm text-base-content/70'>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
                </div>
            </div>
            <button className='cursor-pointer hover:bg-base-200 p-1 rounded-md' onClick={ () => setSelectedUser(null) } >
                <X />
            </button>
        </div>
    </div>
  )

}
