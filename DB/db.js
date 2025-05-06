import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        //getting MONGODB_URL from .env file
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
    }
}

export default connectToDatabase;