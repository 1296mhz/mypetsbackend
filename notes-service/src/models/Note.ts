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
    "orgName": "text",
    "description": "text",
    "codeOfObject": "text",
    "address": "text",
    "sim": "text",
    "fireSafetyOfficer": "text",
    "employee": "text"
  });
const Point = mongoose.model("Point", schema);
export default Point;