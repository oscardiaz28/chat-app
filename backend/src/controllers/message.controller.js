import { User } from "../models/user.model.js"
import { Message } from "../models/message.model.js"
import { bufferToStream, uploadToCloudinary } from "../lib/utils.js"
import { getReceiverSocketId } from "../lib/socket.js"
import { io } from "../lib/socket.js"

export const getUsersForSidebar = async (req, res) => {

    try{
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId }}).select("-password")
        res.json(filteredUsers)

    }catch(err){
        console.log(`Error in getUsersForSidebar controller: ${err.message}`)
        res.status(500).json({message: "Internal Server Error"})
    }

}

export const getMessages = async (req, res) => {
    try{
        const myId = req.user._id
        const {id: userToChatId} = req.params

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId}
            ]
        })
        res.json(messages)
    }catch(err){
        console.log(`Error in getMessages controller: ${err.message}`)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const sendMessage = async (req, res) => {
    const senderId = req.user._id
    const {id: receiverId} = req.params
    const { text } = req.body || {}
    const file = req.file

    if(!text && !file ){
        return res.status(400).json({message: "Text is required"})
    }

    try{   
        const imageUrl = file ? await uploadToCloudinary(file.buffer) : "";
        
        const newMessage = new Message({
            senderId,
            receiverId,
            text: text ?? "",
            image: imageUrl
        }) 

        const saved = await newMessage.save();
        // todo: realtime functionality => socket.io 
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            //only sending this message to the receiver
            io.to(receiverSocketId).emit("newMessage", saved)
        }
        res.json(saved)

    }catch(err){
        console.log(`Error in sendMessage controller: ${err.message}`)
        res.status(500).json({message: "Internal Server Error"})
    }

}