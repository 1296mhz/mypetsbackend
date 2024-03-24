import mongoose from 'mongoose';

const District = mongoose.model("District", new mongoose.Schema({
  name: String,
  avatar: {
    type: String,
    default: '/upload/district.png'
  },
  rating: {
    type: Number,
    default: 0
  },
  description: String,
  inTheTrashCan: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
}))

export default District;