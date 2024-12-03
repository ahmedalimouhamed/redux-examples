import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true},
  stock: {type: Number, default:0}
});

export default mongoose.model('Inventory', inventorySchema);