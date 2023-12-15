import mongoose from 'mongoose';

const conceptSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Concept', conceptSchema);
