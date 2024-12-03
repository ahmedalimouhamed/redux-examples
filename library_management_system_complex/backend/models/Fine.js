import mongoose from 'mongoose';

const fineSchema = new mongoose.Schema({
  amount: {type: Number, required: true},
  BorrowingRecord: {type: mongoose.Schema.Types.ObjectId, ref: 'BorrowingRecord', required: true},
  paid: {type: Boolean, default:false}
});

export default mongoose.model('Fine', fineSchema);