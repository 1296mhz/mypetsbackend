import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const Point = mongoose.model("Point", new mongoose.Schema({
  avatar: {
    type: String,
    default: '/upload/district.png'
  },
  orgName: String,
  codeOfObject: {
    type: String,
    unique: true
  },
  description: String,
  address: String,
  sim: String,
  district: {
    type: Schema.Types.ObjectId,
    ref: 'District'
  },
  fireSafetyOfficer: String,
  employee: String,
  paperAct: String,
  electronicAct: String,
  notes: Array,
  rating: Number,
  active: Boolean,
  maintain: Boolean,
  inTheTrashCan: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}));

export default Point;