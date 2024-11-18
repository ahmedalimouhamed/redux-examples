import { mongoose, CustomerModel, OrderModel } from "./db.js";

const seedOrders = [
  { date: new Date('2024-01-01'), region: 'North', product: 'Laptop', category: 'Electronics', sales: 1200, profit: 200, customerSatisfaction: 90 },
  { date: new Date('2024-01-02'), region: 'South', product: 'Phone', category: 'Electronics', sales: 800, profit: 150, customerSatisfaction: 85 },
  { date: new Date('2024-01-03'), region: 'East', product: 'Chair', category: 'Furniture', sales: 300, profit: 70, customerSatisfaction: 80 },
  { date: new Date('2024-01-04'), region: 'West', product: 'Table', category: 'Furniture', sales: 400, profit: 90, customerSatisfaction: 88 },
  { date: new Date('2024-01-05'), region: 'North', product: 'Mouse', category: 'Accessories', sales: 150, profit: 30, customerSatisfaction: 78 },
];

const seedCustomers = [
  { name: 'Alice', region: 'North', age: 28, satisfactionScore: 90, totalSpend: 1200 },
  { name: 'Bob', region: 'South', age: 35, satisfactionScore: 85, totalSpend: 800 },
  { name: 'Charlie', region: 'East', age: 40, satisfactionScore: 78, totalSpend: 300 },
  { name: 'Diana', region: 'West', age: 32, satisfactionScore: 88, totalSpend: 400 },
];

const seedDatabase = async() => {
  await OrderModel.deleteMany();
  await CustomerModel.deleteMany();
  await OrderModel.insertMany(seedOrders);
  await CustomerModel.insertMany(seedCustomers);

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDatabase();