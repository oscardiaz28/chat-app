import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import {io} from 'socket.io-client'
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get("/auth/check")
            get().connectSocket();
            set({authUser: res.data})
        }catch(err){
            console.log(`Error in checkAuth: `, err.response.data.message)
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },
    signup: async (data) => {
        set({isSigningUp: true})
        try{
            const res = await axiosInstance.post("/auth/signup", data)
            get().connectSocket();
            set({authUser: res.data})
            toast.success("Account created successfully")
        }catch(err){
            throw err
        }finally{
            set({isSigningUp: false})
        }
    },
    logout: async () => {
        try{
            await axiosInstance.post("/auth/logout")
            set({authUser: null})
            get().disconnectSocket()
        }catch(err){
            toast.error(err.response.data.message)
        }
    }, 
    login: async (data) => {
        set({isLoggingIn: true})
        try{
            const res = await axiosInstance.post("/auth/login", data)
            set({authUser: res.data})
            // when logged in start the socket connection
            get().connectSocket();
            toast.success("Sesión iniciada")
        }catch(err){
            toast.error(err.response.data.message)
        }finally{
            set({isLoggingIn: false})
        }
    },

    updateProfile: async (data) => {
        set({isUpdatingProfile: true})
        try{
            const formData = new FormData();
            formData.append("profile", data)
            const res = await axiosInstance.put("/auth/update-profile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(res.data) 
            set({authUser: res.data})
            toast.success("Profile image updated")
        }catch(err){
            toast.error(err.response.data.message)
        }finally{
            set({isUpdatingProfile: false})
        }
    },

    connectSocket: () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected ) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()
        set({socket: socket})

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds})
        })
    },

    disconnectSocket: () => {
        if( get().socket?.connected ){
            get().socket.disconnect()
        }
    }

}))
