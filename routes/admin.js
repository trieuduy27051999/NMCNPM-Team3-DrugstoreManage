const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

//Get Revenue page
router.get("/", authController.getRevenue);
//Get ImportDrug page
router.get("/import", authController.getImport);

router.get("/drug-list", authController.getDrugList);

module.exports = router;
