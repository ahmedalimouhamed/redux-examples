import mongoose from 'mongoose';
const mongoURI = 'mongodb://localhost:27017/dataAnalisis2';
mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

const DataSchema = new mongoose.Schema({
  date: Date,
  region: String,
  product: String,
  sales: Number,
  customerSatisfaction: Number
});

const DataModel = mongoose.model('Data', DataSchema);
export {mongoose, DataModel};