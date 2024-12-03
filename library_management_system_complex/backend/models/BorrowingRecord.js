import mongoose from 'mongoose';

const borrowingRecordSchema = new mongoose.Schema({
  reader: {type: mongoose.Schema.Types.ObjectId, ref: 'Reader', required: true},
  book: {type: mongoose.Schema.ObjectId, ref: 'Book', required: true},
  borrowDate: {type: Date, default: Date.now, required:true},
  dueDate: {type: Date, required: true},
  fine: {type: mongoose.Schema.Types.ObjectId, ref: 'Fine'}
  
});

export default mongoose.model('BorrowingRecord', borrowingRecordSchema);