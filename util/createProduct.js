const mongoose = require("mongoose");
const Product = require("../model/product");

const urlConnect = `mongodb+srv://admin:admin@cluster0-ctxqq.mongodb.net/DrugStore?retryWrites=true&w=majority`;

//Connect to database

mongoose.connect(
  urlConnect,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) throw err;
    console.log("Connect to create successfully!");
    const product = new Product({
      MASP: "SP002",
      MALOAI: "GIAMDAU",
      MANCC: "NCC02",
      TENSP: "TATANOL EXTRA",
      SL: 14,
      GIA: 53000,
      image: "SP002.jpg"
    });
    product.save(err => {
      if (err) throw err;
      console.log("Product successfully saved!");
    });
  }
);
