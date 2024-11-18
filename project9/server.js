import bodyParser from 'body-parser';
import express from 'express';
import { CustomerModel, OrderModel } from './db.js';

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

app.get('/orders', async(req, res) => {
  const {startDate, endDate, category, region} = req.query;
  const filters = {};

  if(startDate && endDate){
    filters.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  if(category){
    filters.category = category;
  }

  if(region){
    filters.region = region;
  }

  try{
    const orders = await OrderModel.find(filters);
    res.json(orders);
  }catch(error){
    res.status(500).json({error: 'Failed to fetch orders'});
  }
});


app.get('/ptofits-by-region', async(req, res) => {
  try{
    const data = await OrderModel.aggregate([
      {$group: {_id: '$region', totalProfit: {$sum: '$profit'}}}
    ]);
    res.json(data);
  }catch(error){
    res.status(500).json({error: 'Failed to fetch data'});
  }
});

app.get('/satisfaction-by-region', async(req, res) => {
  try{
    const data = await CustomerModel.aggregate([
      {$group: {_id: '$region', avgSatisfaction: {$avg: '$satisfactionScore'}}}
    ]);
    res.json(data);
  }catch(error){
    res.status(500).json({error: 'Failed to fetch data '+error});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})