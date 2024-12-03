import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: {type: Number, required: false}
});

export default mongoose.model('Author', authorSchema);