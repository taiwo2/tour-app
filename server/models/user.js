import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: false
  },
  googleId: {
    type: String,
    require: false
  },
  id: {type: String}
})

const tour = mongoose.model('user', userSchema);
export default tour;