import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide a valid email address"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a valid name"],
      trim: true,
    },
    password: {
      type: String,
      default: null,
      trim: true,
    },
    isAdmin: { type: Boolean, default: false },
    image: { type: String, required: [true, "Please provide a image"] },
    disabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);
mongoose.models = {};

const User = mongoose.model("User", UserSchema);
export default User;
