import React, { useEffect, useRef, useState } from 'react'
import {Image, Send, X} from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
import toast from 'react-hot-toast'

export const MessageInput = () => {

  const [text, setText] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const fileInputRef = useRef(null)
  const {selectedUser, sendMessage} = useChatStore()


  const clearForm = () => {
    setText("")
    setImagePreview(null)
    setImageFile(null)
    if(fileInputRef.current) fileInputRef.current.value = ""
  }

  const removeImage = () => {
    setImagePreview(null)
    setImageFile(null)
    if(fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file")
      return
    }
    if(file){
      const objectUrl = URL.createObjectURL(file)
      setImageFile(file)
      setImagePreview(objectUrl)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("text", text)
    formData.append("image", imageFile)    

    try{
      await sendMessage(formData)
      clearForm()
    }catch(err){
      toast.error(err.response.data.message)
    }
  }

  useEffect(() => { 
    console.log("Cambio de chat")
    if(imagePreview) {
      setImagePreview(null)
      setImageFile(null)
      fileInputRef.current.value = ""
    }
  }, [selectedUser._id])

  return (
    <div className='p-4 w-full'>
   
      {imagePreview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img src={imagePreview} alt="" className='w-20 h-20 object-cover rounded-lg border border-zinc-700' />
            <button onClick={removeImage} className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center' type='button'><X className='size-3'/></button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
        <div className='flex-1 flex gap-2'>
          <input type="text" className='w-full input input-bordered rounded-lg input-sm sm:input-md' 
          placeholder='Type a message...'
          value={text}
          onChange={(e) => setText(e.target.value)}
          />
          <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange} />
          <button type='button' className={`hidden sm:flex btn btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`} onClick={ () => fileInputRef.current.click() }>
            <Image size={20} />
          </button>
          <button type='submit' className='btn btn-circle' disabled={ text == "" && !imagePreview }>
            <Send size={20} />
          </button>
        </div>
      </form> 
    </div>
  )
  
}
