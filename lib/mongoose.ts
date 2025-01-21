import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log('Mongodb URI not found');
    if(isConnected) return console.log('Already connected to DB');

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to DB', error);
    }
}