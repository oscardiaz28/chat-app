import mongoose from "mongoose";
import { hashPassword } from "../lib/utils.js";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    },
    profilePic: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

userSchema.pre('insertMany', async function (next, docs){
    try{
        for(let doc of docs){
            if(doc.password && !doc.password.startsWith("$2b$")){
                doc.password = await hashPassword(doc.password)
            }
        }
        next()
    }catch(err){
        next(err)
    }
})

//primer parametro -> representa el nombre del Modelo
export const User = mongoose.model('User', userSchema)
