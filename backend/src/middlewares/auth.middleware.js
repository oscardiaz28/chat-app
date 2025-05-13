import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const protectRoute = async (req, res, next) => {
    const token = req.cookies.jwt
    if(token == undefined || token == "" ){
        return res.status(401).json({message: "Unauthorized - No token provided"})
    }
    try{
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(id).select("-password")
        req.user = user
        next()
    }catch(err){
        res.status(400).json({message: "Invalid token"})
    }
}