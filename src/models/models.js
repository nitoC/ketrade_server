const mongoose = require("mongoose");
const personSchema = new mongoose.Schema({
  username: {
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
  balance: {
    type: Number,
  },
  capital: {
    type: Number,
  },
  plan: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  },
  pending: {
    plan: {
      type: String,
    },
    deposit: {
      type: Number,
    },
  },
  withdrawal: {
    address: {
      type: String,
    },
    amount: {
      type: Number,
    },
  },
  transactions: [
    {
      typeO: {
        type: String,
      },
      value: {
        type: Number,
      },
      text: {
        type: String,
      },
      time: {
        type: String,
      },
    },
  ],
});
module.exports = mongoose.model("person", personSchema);
