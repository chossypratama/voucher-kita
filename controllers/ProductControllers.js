const { User, UserProfile, Product, Category } = require('../models')

class Controller {
  static home(req, res) {
    const userSession = req.session.user
    const { search, sort, param, isLogout } = req.query

    Product.findAll({ include: Category, User })
      .then((products) => {
        // res.send(products)
        res.render('home.ejs', { products, userSession })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static formAdd(req, res) {
    Category.findAll()
      .then((result) => {
        res.render('formAddProduct', { categories: result })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static createProduct(req, res) {
    const { name, description, price, imageUrl, stock, CategoryId } = req.body
    let UserId = 8 //<<<UserId 8 sebagai Seller
    Product.create({
      name,
      description,
      price,
      imageUrl,
      stock,
      CategoryId,
      UserId,
    })
      .then(() => {
        res.redirect('/add')
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = Controller
