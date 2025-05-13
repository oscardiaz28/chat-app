import mongoose from 'mongoose'
export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB conectado al host: ${conn.connection.host}`)
    }catch(err){
        console.log(`No se ha podido conectar a la bd: ${err.message}`)
    }
}
