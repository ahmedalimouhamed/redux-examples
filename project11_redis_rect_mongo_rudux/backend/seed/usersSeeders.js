import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const seedUsers = async() => {
  try{
    await User.deleteMany();
    const users = [
      {name: 'Alice', email: 'alice@gmail.com', password: '123456'},
      {name: 'Bob', email: 'bob@gmail.com', password: '123456'},
      {name: 'charlie', email: 'charlie@gmail.com', password: '123456'},
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully');
    //process.exit();
  }catch(err){
    console.error('Error seeding users', err);
    process.exit(1);
  }
}


export default seedUsers;