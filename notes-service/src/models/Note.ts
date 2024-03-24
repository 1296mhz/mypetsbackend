import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const schema = new mongoose.Schema({
  // files: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'District'
  //   }
  // ]
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Point'
  },
  value: String,
  inTheTrashCan: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

schema.index(
  {
    "value": "text",
  });
const Point = mongoose.model("Note", schema);
export default Point;