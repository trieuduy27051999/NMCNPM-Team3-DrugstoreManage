const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");
const productController = require("../controller/product");
const auth = require("../middleware/is-auth");

router.get("/", auth, productController.getOverview);
//Get Revenue page
router.get("/revenue", auth, productController.getRevenue);
//Get ImportDrug page
router.get("/import-drug", auth, productController.getImport);

router.get("/drug-list", auth, productController.getDrugList);

router.get("/login", authController.getLogIn);

router.post("/login", authController.postLogIn);

router.get("/register", auth, authController.getSignUp);

router.post("/register", auth, authController.postSignUp);

router.get("/logout", auth, authController.getLogOut);

router.get("/add-order", auth, productController.addOrder);

router.get("/add-to-order/:TENSP", auth, productController.addToOrder);

router.get("/check-out", auth, productController.getCheckOut);

router.get("/delete/:TENSP", auth, productController.deleteItem);

router.get("/get-order", auth, productController.getOrder);

module.exports = router;
