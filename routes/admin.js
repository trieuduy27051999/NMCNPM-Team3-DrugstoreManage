const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const productController = require("../controller/product");

router.get("/", productController.getOverview);
//Get Revenue page
router.get("/revenue", productController.getRevenue);
//Get ImportDrug page
router.get("/import-drug", productController.getImport);

router.get("/drug-list", productController.getDrugList);

router.get("/login", authController.getLogIn);

router.post("/login", authController.postLogIn);

router.get("/register", authController.getSignUp);

router.post("/register", authController.postSignUp);

router.get("/logout", authController.getLogOut);

router.get("/add-order", productController.addOrder);

router.get("/add-to-order/:TENSP", productController.addToOrder);

router.get("/check-out", productController.getCheckOut);

router.get("/delete/:TENSP", productController.deleteItem);

module.exports = router;
