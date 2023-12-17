import mongoose from 'mongoose';

const shoppingSchema = new mongoose.Schema({
  concept: {
    type: mongoose.Schema.Types.ObjectId,  // Use ObjectId instead of String
    ref: 'Concept',
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,  // Use ObjectId instead of String
    ref: 'Type',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, {
  versionKey: false,
  timestamps: true,
});

export default mongoose.model('Shopping', shoppingSchema);
