const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductControllers");

router.get("/product/add", ProductController.formAdd);
router.post("/product/add", ProductController.createProduct);

module.exports = router;
