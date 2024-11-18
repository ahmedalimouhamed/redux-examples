import {mongoose, DataModel} from './db.js';

const seedData = [
  {date: new Date('2024-01-01'), region: 'North', product: 'A', sales: 120, profit: 50, customerSatisfaction:85},
  {date: new Date('2024-01-01'), region: 'South', product: 'B', sales: 120, profit: 30, customerSatisfaction:78},
  {date: new Date('2024-01-02'), region: 'North', product: 'A', sales: 140, profit: 60, customerSatisfaction:88},
  {date: new Date('2024-01-02'), region: 'South', product: 'B', sales: 100, profit: 35, customerSatisfaction:80},
  {date: new Date('2024-01-03'), region: 'East', product: 'C', sales: 75, profit: 20, customerSatisfaction:70},
  {date: new Date('2024-01-03'), region: 'West', product: 'D', sales: 85, profit: 40, customerSatisfaction:82},
  {date: new Date('2024-01-04'), region: 'North', product: 'A', sales: 150, profit: 65, customerSatisfaction:90},
  {date: new Date('2024-01-04'), region: 'South', product: 'B', sales: 110, profit: 50, customerSatisfaction:85},
];

const seedDatabase = async() => {
  await DataModel.deleteMany();
  await DataModel.insertMany(seedData);
  mongoose.connection.close();
}

seedDatabase();