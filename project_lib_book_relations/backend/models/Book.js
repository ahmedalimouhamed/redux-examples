import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {type: String, required: true},
  genre: {type: String, required: true},
  publishedYear: {type: Number, required: true},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true},
  publisher: {type: mongoose.Schema.Types.ObjectId, ref: 'Publisher', required: true}
});

export default mongoose.model('Book', bookSchema);