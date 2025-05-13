import { Router } from "express";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import multer from 'multer'

const messageRoutes = Router()

messageRoutes.get("/users", protectRoute, getUsersForSidebar)
messageRoutes.get("/:id", protectRoute, getMessages)

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

messageRoutes.post("/send/:id", protectRoute, upload.single('image'), sendMessage)

export {messageRoutes}