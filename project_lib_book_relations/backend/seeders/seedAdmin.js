import mongoose from "mongoose";
import Admin from '../models/Admin.js';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async() => {
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongo Db');
    const existingAdmin = await Admin.findOne({username: 'admin'});
    if(existingAdmin){
      console.log('admin user already exists : ', existingAdmin.username);
      process.exit(0);
    }

    const admin = new Admin({
      username: 'admin',
      password: '123456'
    });

    await admin.save();
    console.log('Admin user created : ', admin.username);
    process.exit(0);
  }catch(err){
    console.error('Error seeding admin ', err);
  }
}

seedAdmin();