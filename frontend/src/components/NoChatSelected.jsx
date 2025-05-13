import React from 'react'
import {MessageSquare} from 'lucide-react'

export const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 items-center justify-center p-16 bg-base-100/50'>
        <div className='max-w-md text-center'>
            {/* Icon */}
            <div className='flex justify-center mb-4'>
                <div className='relative'>
                    <div className='size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce'>
                        <MessageSquare className='size-8 text-primary' />
                    </div>
                </div>
            </div>
            {/* Texts */}
            <h2 className='text-2xl font-bold mb-2'>Welcome to Chatty!</h2>
            <p className='text-base-content/60'>Select a conversation from the sidebar to start chatting</p>
        </div>
    </div>
  )

}
