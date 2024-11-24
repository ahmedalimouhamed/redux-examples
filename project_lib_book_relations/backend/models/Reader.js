import mongoose from 'mongoose';

const readerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: true},
  borrowedBooks: [{type: mongoose.Schema.Types.ObjectId, ref:'Book'}]
})

export default mongoose.model('Reader', readerSchema)