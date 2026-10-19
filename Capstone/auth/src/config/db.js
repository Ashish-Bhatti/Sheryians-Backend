import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.AUTH_MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
        process.exit(1); // Exit the process if there is an error
    }
};

export default connectDB;
