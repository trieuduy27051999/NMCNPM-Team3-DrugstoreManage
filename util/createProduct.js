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
      MASP: "SP03",
      MALOAI: "L03",
      MANCC: "NCC03",
      TENSP: "PARADOL123",
      SL: 10
    });
    product.save(err => {
      if (err) throw err;
      console.log("Product successfully saved!");
    });
  }
);
