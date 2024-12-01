import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: "./.env"}); // Specify a custom .env file path

// Connect to MongoDB

//Changes needed
export const connectDb = async() => {
    const URI = `${process.env.DB_URI}/${process.env.DB_NAME}`;
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected DB Name :", process.env.DB_NAME); 
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}




