const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  role: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model("User", userSchema);
