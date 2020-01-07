const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  order: {
    type: Object,
    required: true
  },
  date: {
    type: Date,
    required: false,
    default: Date.now
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);
