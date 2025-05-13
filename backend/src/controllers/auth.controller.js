import { bufferToStream, generarToken, hashPassword, sendCookie } from "../lib/utils.js"
import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
    const {email, fullName, password} = req.body
    if(!email || !fullName || !password){
        return res.status(400).json({message: "All fields are required"})
    }

    if(password.length < 4){
        return res.status(400).json({message: "Password must be at least 4 characters"})
    }
    const user = await User.findOne({email})
    if(user) return res.status(400).json({message: "Email already exists"})
    
    const hashedPassword = await hashPassword(password)
   
    try{
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })
        const token = generarToken(newUser._id)
        sendCookie("jwt", token, res)
        const userSaved = await newUser.save()

        res.status(201).json({
            _id: userSaved._id,
            fullName: userSaved.fullName,
            email: userSaved.email,
            profilePic: userSaved.profilePic,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })

    }catch(err){
        console.log(`Error in signup controller: ${err.message}`)
        res.status(500).json({message: "Internal Server Error"})
    }

}

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message: "Invalid Credentials"})
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid Credentials"})

        const token = generarToken(user._id)
        sendCookie("jwt", token, res)

        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })

    }catch(err){
        console.log("Error in login controller " + err.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    }catch(err){
        console.log("Error in logout controller " + err.message)
        res.status(500).json({message: "Internal Server Error"})
    }
}

export const updateProfile = async (req, res) => {
    const {user} = req
    const files_allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if(!req.file){
        return res.status(400).json({message: "Profile pic is required"})
    }
    const {mimetype, originalname, buffer, size, fieldname} = req.file
    if(!files_allowed.includes(mimetype)){
        return res.status(400).json({message: "File type not allowed"})
    }
    
    if(user.profilePic !== ""){
        const imgId = user.profilePic.split("/").pop().split(".")[0]
        await cloudinary.uploader.destroy(`images/${imgId}`)
    }
    //upload image to cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
        {folder: "images"},
        async (error, result) => {
            if(error){
                console.log(`Error in updateProfile controller: ${error.message}`)
                return res.status(500).json({message: "Internal Server Error"})
            }
            const {secure_url} = result
            const updatedUser = await User.findByIdAndUpdate(user._id, {profilePic: secure_url }, {new: true}).select("-password")
            res.json(updatedUser)
        }
    );
    bufferToStream(buffer).pipe(uploadStream)
}

export const checkAuth = (req, res) => {
    try{
        res.status(200).json(req.user)
    }catch(err){
        console.log(`Error in checkAuth controller: ${err.message}`)
        res.status(500).json({message: "Internal Server Error"})
    }
}