const Product = require("../model/product");
const tempOrder = require("../model/tempOrder");
const Order = require("../model/order");
var TENSP;
var LOAISP;
var MASP;
var MANCC;

exports.getOverview = (req, res, next) => {
  var date = new Date();
  var totalIncome = 0;
  var totalOrder = 0;
  var Income = 0;
  var monthIncome = 0;
  Order.find({}).then(orders => {
    orders.forEach(function(order) {
      if (order) {
        totalOrder++;
        totalIncome += order.totalPrice;
        if (
          order.date.getDate() == date.getDate() &&
          order.date.getMonth() == date.getMonth() &&
          order.date.getYear() == date.getYear()
        ) {
          Income += order.totalPrice;
        }
        if (
          order.date.getMonth() == date.getMonth() &&
          order.date.getYear() == date.getYear()
        ) {
          monthIncome += order.totalPrice;
        }
      }
    });
    Product.find({})
      .sort({ buyCount: "desc" })
      .limit(5)
      .then(top5 => {
        Product.find({})
          .sort({ buyCount: "desc" })
          .limit(5)
          .then(top5 => {
            return res.render("overview", {
              title: "Tổng quan",
              monthIncome: monthIncome,
              Income: Income,
              totalOrder: totalOrder,
              totalIncome: totalIncome,
              top5: top5
            });
          });
      });
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
  var orderProduct;
  if (!req.session.order) {
    orderProduct = null;
  } else {
    var order = new tempOrder(req.session.order);
    orderProduct = order.generateArray();
  }
  Product.find({ TENSP: new RegExp(TENSP, "i") }).then(products => {
    res.render("add-order", {
      title: "Thanh toán",
      listProduct: products,
      orderProduct: orderProduct
    });
  });
};

exports.addToOrder = (req, res, next) => {
  var ten = req.params.TENSP;
  var order = new tempOrder(req.session.order ? req.session.order : {});
  Product.findOne({ TENSP: ten }, (err, product) => {
    if (err) {
      return res.redirect("/add-order");
    }
    console.log(product);
    order.add(product, product.MASP);
    req.session.order = order;
    console.log(req.session.order);
    res.redirect("/add-order");
  });
};

exports.getCheckOut = async (req, res, next) => {
  for (var id in req.session.order.items) {
    await Product.findOne({ MASP: id }).then(product => {
      product.buyCount += req.session.order.items[id].qty;
      product.save();
    });
  }
  const newOrder = new Order({
    order: req.session.order,
    totalPrice: req.session.order.totalPrice
  });
  req.session.order = null;
  newOrder.save();
  res.redirect("/add-order");
};

exports.deleteItem = (req, res, next) => {
  var ten = req.params.TENSP;
  var order = new tempOrder(req.session.order ? req.session.order : {});
  Product.findOne({ TENSP: ten }, (err, product) => {
    if (err) {
      return res.redirect("/add-order");
    }
    order.deleteItem(product.MASP);
    req.session.order = order;
    res.redirect("/add-order");
  });
};
