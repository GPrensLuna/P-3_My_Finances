import mongoose from 'mongoose';

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
  },
   concept: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Concept',
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type',
  },
  description: {
    type: String,
  },
  value: {
    type: Number,
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
