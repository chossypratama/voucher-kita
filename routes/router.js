const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controllers')
const UserController = require('../controllers/UserController')

// GET Register
router.get('/register', UserController.registerForm)
// POST Register
router.post('/register', UserController.postRegister)

// GET Register
router.get('/login', UserController.loginForm)
// POST Register
router.post('/login', UserController.postLogin)

// Main landing page
router.get('/')

// Middleware validate user login and role
router.use((req, res, next) => {
  if(!req.session.userId) {
    res.redirect('/login?sessionNotFound=true')
  }else{
    next()
  }
})

router.get('/add', Controller.formAdd)
router.post('/add', Controller.createProduct)

module.exports = router
