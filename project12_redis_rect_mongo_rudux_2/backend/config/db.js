import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDb = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDb Connected...');
  }catch(err){
    console.error('Database connection error', err);
    process.exit(1);
  }
}

export default connectDb;