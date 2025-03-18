import mongoose from "mongoose";
import dotenv from  "dotenv"
dotenv.config()

if (!process.env.MONGO_URI) {
    throw new Error('Database connection string (MONGO_URI) is not set in the .env file.');
  }
const dbUrl: string = process.env.MONGO_URI;

const connectDB = async () =>{
    try {
        await mongoose.connect(dbUrl)
        console.log("MongoDB connected succesfully ")
    } catch (error:any) {
        console.log("There is some problem connecting with the DB",error.message)
        process.exit(1);
    }
}

export default connectDB;