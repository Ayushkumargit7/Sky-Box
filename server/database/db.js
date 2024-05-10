import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD; 
const DB_URI = process.env.DB_URI;

const Connection = async () => {
    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true });
        mongoose.set('strictQuery', false);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database', error.message)
    }
}

export default Connection;