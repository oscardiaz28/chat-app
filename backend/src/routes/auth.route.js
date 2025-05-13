import {Router} from 'express'
import { checkAuth, login, logout, signup, updateProfile } from '../controllers/auth.controller.js'
import { protectRoute } from '../middlewares/auth.middleware.js'
import multer from 'multer'

export const authRoutes = Router()

authRoutes.post("/signup", signup)

authRoutes.post("/login", login)

authRoutes.post("/logout", logout)

//multer like memory storage
const storage = multer.memoryStorage()
const upload = multer({storage})

authRoutes.put("/update-profile", protectRoute, upload.single('profile'), updateProfile)

authRoutes.get("/check", protectRoute, checkAuth)