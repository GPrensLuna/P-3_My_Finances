import mongoose from 'mongoose';

const typeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
},
{
  versionKey: false,
  timestamps: true,
});

export default mongoose.model('Type', typeSchema);
