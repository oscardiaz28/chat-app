import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { SidebarSkeleton } from './skeletons/SidebarSkeleton'
import { Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'

export const Sidebar = () => {

    const {isUsersLoading, getUsers, selectedUser, setSelectedUser, users} = useChatStore()
    const {onlineUsers} = useAuthStore()
    const [showOnlineOnly, setShowOnlineOnly] = useState(false)

    useEffect(() => {
        getUsers()
        return () => {
            setSelectedUser(null)
        }
    }, [])   
    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

    if(isUsersLoading){
        return <SidebarSkeleton />
    }

  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
        <div className='border-b border-base-300 p-5 w-full'>
            <div className='flex items-center gap-2'>
                <Users className='size-6' />
                <span className='font-medium hidden lg:block'>Contacts</span>
            </div>
            {/* Todo: Online filter toggle */}
            <div className='mt-3 hidden lg:flex items-center gap-2'>
                <label className='cursor-pointer flex items-center gap-2'>
                    <input type="checkbox" checked={showOnlineOnly} onChange={e => setShowOnlineOnly(e.target.checked)}
                    className='checkbox checkbox-sm'
                    />
                    <span className='text-sm'>Show online only</span>
                </label>
                <span className='text-xs text-zinc-500'>({onlineUsers.length - 1} online)</span>
            </div>
        </div>
        <div className='overflow-y-auto py-3 w-full'>
            {filteredUsers.map( (user) => (
                <button key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full flex items-center gap-3 hover:bg-base-300 p-3
                    ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300 " : ""}
                    `}
                >   
                    <div className='relative mx-auto lg:mx-0'>
                        <img src={user.profilePic || "/images/perfil.webp"} className='size-12 object-cover rounded-full' />
                        {onlineUsers.includes(user._id) && (
                            <span className='absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900' />
                        ) }
                    </div>

                    <div className='hidden lg:block text-left min-w-0'>
                        <div className='truncate font-medium'>{user.fullName}</div>
                        <div className='text-xs text-zinc-400'>
                            {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                        </div>
                    </div>

                </button>
            ) )}
        </div>
    </aside>
  )

}
