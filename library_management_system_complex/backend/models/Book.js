import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true},
  genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true},
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
  inventory: {type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'},
});

export default mongoose.model('Book', bookSchema);