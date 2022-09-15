const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductControllers')
const multerMiddleware = require('../middlewares/multerMiddleware')

router.use(multerMiddleware())

router.get('/product/:userId', ProductController.listProduct)
router.get('/product/:userId/emptyStock', ProductController.listEmpty)
router.get('/product/:userId/add', ProductController.formAdd)
router.post('/product/:userId/add', ProductController.createProduct)
router.get('/product/:userId/delete/:productId', ProductController.deleteProduct)
router.get('/product/:userId/edit/:productId', ProductController.formEditProduct)
router.post('/product/:userId/edit/:productId', ProductController.updateProduct)

module.exports = router
