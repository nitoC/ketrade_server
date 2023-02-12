const mongoose = require("mongoose");
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
module.exports = mongoose.model("admin", adminSchema);
