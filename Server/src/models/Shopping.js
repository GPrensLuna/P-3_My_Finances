import mongoose from 'mongoose';

const shoppingSchema = new mongoose.Schema({
  concept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Concept',
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
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
   done: {
    type: Boolean,
    required: true,
    default:true,
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
