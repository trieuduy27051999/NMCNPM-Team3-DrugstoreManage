const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  MASP: {
    type: String,
    required: true
  },
  MALOAI: {
    type: String,
    required: true
  },
  MANCC: {
    type: String,
    required: true
  },
  TENSP: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  HANGSX: {
    type: String,
    required: false
  },
  NGAYHETHAN: {
    type: Date,
    required: false
  }
});

module.exports = mongoose.model("Product", productSchema);
