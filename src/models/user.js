import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  capital: {
    type: Number,
    default: 0
  },
  plan: {
    type: String,
    enum: ['Gold', 'Diamond', 'Platinum'],
    default: "Gold",

  },
  refreshToken: {
    type: String,
  }
});
export default mongoose.model("user", userSchema);
