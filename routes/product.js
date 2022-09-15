const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductControllers");

router.get("/product/:userId", ProductController.listProduct);

router.get("/product/8/add", ProductController.formAdd);
router.post("/product/:userId/add", ProductController.createProduct);
router.get(
  "/product/:userId/delete/:productId",
  ProductController.deleteProduct
);
router.get(
  "/product/:userId/edit/:productId",
  ProductController.formEditProduct
);
router.post(
  "/product/:userId/edit/:productId",
  ProductController.updateProduct
);

module.exports = router;
