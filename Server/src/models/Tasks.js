import mongoose from 'mongoose';

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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
    default:false,
  },
 deleted: {
    type: Boolean,
    default: false,
  },
},
{
  versionKey: false,
  timestamps: true,
});

export default mongoose.model('Tasks', tasksSchema);
