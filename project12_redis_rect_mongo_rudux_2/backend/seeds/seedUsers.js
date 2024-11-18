import User from "../models/User.js";

const seedUsers = async() => {
  try{
    await User.deleteMany();
    const users = [
      { name: 'Alice', email: 'alice@example.com', age: 25, role: 'user' },
      { name: 'Bob', email: 'bob@example.com', age: 30, role: 'admin' },
      { name: 'Charlie', email: 'charlie@example.com', age: 35, role: 'moderator' },
    ];

    await User.insertMany(users);
    console.log('Users seeded successfully.');
    process.exit();
  }catch(err){
      console.error('Error seeding users: ', err);
      process.exit(1);
  }
}

seedUsers();