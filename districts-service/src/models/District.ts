import mongoose from 'mongoose';

const schema = new mongoose.Schema({
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
})

schema.index({'name': 'text', 'description': 'text'});

const District = mongoose.model("District", schema)
export default District;