import mongoose from "mongoose";

const tourSchema = mongoose.Schema({
  title:  String,
  name: String,
  description:  String,
  creator:  String,
  tags: [String],
  imageFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  }
})

const tourModel = mongoose.model('tour', tourSchema);
export default tourModel;