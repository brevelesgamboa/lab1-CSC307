import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true,
    minlength: 2
  }
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;