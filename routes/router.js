const express = require("express");
const router = express.Router();
const Controller = require("../controllers/controllers");

router.get("/add", Controller.formAdd);
router.post("/add", Controller.createProduct);

module.exports = router;
