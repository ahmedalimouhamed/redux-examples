import mongoose from "mongoose";

const mongoURI = 'mongodb://localhost:27017/ecommerceAnalytics';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology:true
});

const OrderSchema = new mongoose.Schema({
  date: Date,
  region: String,
  product: String,
  category: String,
  sales: Number,
  profit: Number,
  customerSatisfaction: Number
});

const CustomerSchema = new mongoose.Schema({
  name: String,
  region: String,
  age: Number,
  satisfactionScore: Number,
  totalSpend: Number
});

const OrderModel = mongoose.model('Order', OrderSchema);
const CustomerModel = mongoose.model('Customer', CustomerSchema);

export {mongoose, OrderModel, CustomerModel};