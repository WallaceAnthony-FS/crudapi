import mongoose from "mongoose"

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  }
})

export default mongoose.model('Student', studentSchema)