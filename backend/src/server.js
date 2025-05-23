import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { app, server } from './lib/socket.js'
import { connectDB } from './lib/db.js'

import { authRoutes } from './routes/auth.route.js'
import { messageRoutes } from './routes/message.route.js'

import path from 'path'

dotenv.config()

const PORT = process.env.PORT
const __dirname = path.resolve()

connectDB()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

if (true) {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen( PORT, () => {
    console.log("Server running on port " + PORT)
})