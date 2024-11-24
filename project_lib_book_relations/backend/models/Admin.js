import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

adminSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

adminSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('Admin', adminSchema);