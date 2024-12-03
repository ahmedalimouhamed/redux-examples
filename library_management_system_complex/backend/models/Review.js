import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reader: {type: mongoose.Schema.Types.ObjectId, ref: 'Reader', required: true},
  book: {type: mongoose.Schema.Types.ObjectId, ref:'Book', required: true},
  rating: {type: Number, min:1, max:5, required: true},
  comment: {type: String},
  date: {type: Date, default: Date.now}
});

export default mongoose.model('Review', reviewSchema);