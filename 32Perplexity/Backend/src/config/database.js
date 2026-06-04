import mongoose from 'mongoose';

async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('server is connected to database');
}

export default connectToDB;
