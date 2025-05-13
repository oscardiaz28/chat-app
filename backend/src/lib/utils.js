import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {Readable} from 'stream'
import cloudinary from './cloudinary.js'

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

export const generarToken = (userId) => {
    const payload = {
        id: userId
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })
    return token
}

export const sendCookie = (name, payload, res) => {
    res.cookie(name, payload, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
    return true
}

export const bufferToStream = (buffer) => {
    const readable = new Readable()
    readable.push(buffer)
    readable.push(null)
    return readable;
}

export const uploadToCloudinary = (fileBuffer) => {
    return new Promise( (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {folder: "images"},
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url)
            }
        );
        bufferToStream(fileBuffer).pipe(uploadStream)
    } )
}