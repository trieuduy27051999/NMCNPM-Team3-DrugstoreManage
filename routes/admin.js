const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const productController = require("../controller/product");

//Get Revenue page
router.get("/", productController.getRevenue);
//Get ImportDrug page
router.get("/import", productController.getImport);

router.get("/drug-list", productController.getDrugList);

router.get("/login", authController.getLogIn);

router.post("/login", authController.postLogIn);

router.get("/register", authController.getSignUp);

router.post("/register", authController.postSignUp);

module.exports = router;
