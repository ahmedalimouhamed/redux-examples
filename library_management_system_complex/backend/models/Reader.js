import mongoose from 'mongoose';

const readerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, unique:true, required: true},
  borrowedBooks: [{type: mongoose.Schema.Types.ObjectId, ref: 'BorrowingRecord'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  fines: [{type: mongoose.Schema.Types.ObjectId, ref: 'Fine'}]
});

export default mongoose.model('Reader', readerSchema);