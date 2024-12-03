import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  books: [{type: mongoose.Schema.Types.ObjectId, ref:'Book'}]
});

export default mongoose.model('Genre', genreSchema);