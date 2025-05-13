import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import { User } from "../models/user.model.js";

config()
const seedUsers = [
  // Female Users
  {
    email: "emma.thompson@example.com",
    fullName: "Emma Thompson",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

const seedDatabase = async () => {
    try{
        await connectDB()
        await User.insertMany(seedUsers)
        console.log("Database seeded successfully")
    }catch(err){
        console.log("Error seeding database, ", err)
    }
}

seedDatabase()