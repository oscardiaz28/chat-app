import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { ChatHeader } from './ChatHeader'
import { MessageInput } from './MessageInput'
import { MessageSkeleton } from './skeletons/MessageSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formaterTime } from '../lib/utis'
import { useRef } from 'react'

export const ChatContainer = () => {

    const { messages, getMessages, selectedUser, isMessagesLoading, subcribeToMessages, unsubscribeFromMessages } = useChatStore()
    const { authUser } = useAuthStore()
    const messageEndRef = useRef(null)

    useEffect(() => {
        getMessages(selectedUser._id)
        subcribeToMessages()

        return () => {
            unsubscribeFromMessages()
        }
    }, [selectedUser._id])

    useEffect(() => {
        if(messageEndRef.current && messages ){
            messageEndRef.current.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    if(isMessagesLoading) return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    )

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />

            {/* Chat Messages */}
            <div className='flex-1 overflow-y-auto p-4 space-y-10'>
                {messages.map( (message) => (
                    <div key={message._id} className={`relative chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} ref={messageEndRef}>
                        <div className='chat-bubble flex flex-col px-2'>
                            {message.image && (
                                <div className={`w-full max-w-xs h-full overflow-hidden rounded-lg 
                                ${message.text && "mb-2"}`}>
                                    <img src={message.image} alt="" className="w-full h-full object-cover" />
                                </div>
                            )}
                            {message.text && <p className='text-sm pb-1 text-left'>{message.text}</p> }
                        </div>
                        <div className='absolute top-full '>
                            <p className='text-[11px] opacity-60'>{formaterTime(message.createdAt)}</p>
                        </div>
                    </div>
                ) )}
            </div>

            {/* Chat Input */}
            <MessageInput />
        </div>
    )

}
