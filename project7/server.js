import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/dataAnalysis', {useNewUrlParser:true, useUnifiedTopology:true});

const DataSchema = new mongoose.Schema({value: Number, label:String});
const DataModel = mongoose.model('Data', DataSchema);

app.get('/data', async(req, res) => {
  const data = await DataModel.find();
  res.json(data);
});

app.post('/data', async(req, res) => {
  const newData = new DataModel(req.body);
  await newData.save();
  res.status(201).json(newData);
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'))