import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = 'mongodb+srv://developer:kL37ytm9ce3qfaPo@cluster0.5koqaoi.mongodb.net/';//Tengo que poner mi base de datos

export const init = async () =>{
    try {
        await mongoose.connect(URI);
        console.log('Database connected✅');
    } catch (error) {
        console.error('Error to connect to database😩', error.message);
    }
}

