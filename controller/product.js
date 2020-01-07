const Product = require("../model/product");
var TENSP;
var LOAISP;
var MASP;
var MANCC;

exports.getOverview = (req, res, next) => {
  res.render("overview", {
    title: "Tổng quan"
  });
};

exports.getRevenue = (req, res, next) => {
  res.render("revenue", {
    title: "Doanh thu"
  });
};

exports.getImport = (req, res, next) => {
  TENSP = req.query.TENSP !== undefined ? req.query.TENSP : TENSP;
  MASP = req.query.MASP !== undefined ? req.query.MASP : MASP;
  MANCC = req.query.MANCC !== undefined ? req.query.MANCC : MANCC;
  if (Object.entries(req.query).length == 0) {
    TENSP = "";
    MASP = "";
    MANCC = "";
  }
  Product.find({
    TENSP: new RegExp(TENSP, "i"),
    MASP: new RegExp(MASP, "i"),
    MANCC: new RegExp(MANCC, "i")
  }).then(products => {
    res.render("import-drug", {
      title: "Nhập thuốc",
      listProduct: products
    });
  });
};

exports.getDrugList = (req, res, next) => {
  TENSP = req.query.TENSP !== undefined ? req.query.TENSP : TENSP;
  LOAISP = req.query.LOAISP !== undefined ? req.query.LOAISP : LOAISP;
  if (Object.entries(req.query).length == 0) {
    TENSP = "";
    LOAISP = "";
  }
  Product.find({
    TENSP: new RegExp(TENSP, "i"),
    MALOAI: new RegExp(LOAISP, "i")
  }).then(products => {
    res.render("drug-list", {
      title: "Danh sách thuốc",
      listProduct: products
    });
  });
};

exports.addOrder = (req, res, next) => {
  TENSP = req.query.TENSP !== undefined ? req.query.TENSP : TENSP;
  if (Object.entries(req.query).length == 0) {
    TENSP = "";
  }
  Product.find({ TENSP: new RegExp(TENSP, "i") }).then(products => {
    res.render("add-order", {
      title: "Thanh toán",
      listProduct: products
    });
  });
};
