const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/UserController");

// GET Register
router.get("/register", UserControllers.registerForm);
// POST Register
router.post("/register", UserControllers.postRegister);

// GET Register
router.get("/login", UserControllers.loginForm);
// POST Register
router.post("/login", UserControllers.postLogin);

module.exports = router;
