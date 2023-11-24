import mongoose from 'mongoose';


const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    Address: {
      btc: {
        type: String,
      },
      usdt: {
        type: String,
      },
    },
  },
  { collection: "admin" }
);
export default mongoose.model("admin", adminSchema);
