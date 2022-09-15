const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// GET Register
router.get("/register", UserController.registerForm);
// POST Register
router.post("/register", UserController.postRegister);

// GET Register
router.get("/login", UserController.loginForm);
// POST Register
router.post("/login", UserController.postLogin);

module.exports = router;
