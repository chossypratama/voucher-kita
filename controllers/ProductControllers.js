const { Op } = require('sequelize')
const { User, Product, Category } = require('../models')

class Controller {
  static home(req, res) {
    const userSession = req.session.user
    const { search, ob, sort, boughtProduct, isLogout } = req.query

    let orderByQ = ob ? { order: [[`${ob}`, sort ? `${sort}` : 'ASC']] } : { order: [['createdAt', 'DESC']] }
    let searchQ = search ? { name: { [Op.iLike]: `%${search}%` } } : ''
    let options = {
      include: [Category, User],
      where: { stock: { [Op.gt]: 0 }, ...searchQ },
      ...orderByQ,
    }

    Product.findAll(options)
      .then((products) => {
        // res.send(products)      
        res.render('home.ejs', { products, userSession, boughtProduct, isLogout })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static buyProduct(req, res) {
    const { productId } = req.params
    const userSession = req.session.user

    if (userSession.role == 'buyer') {
      let boughtProduct
      Product.findOne({ where: { id: productId } })
        .then((product) => {
          if (product) {
            boughtProduct = product
            return Product.increment({ stock: -1 }, { where: { id: productId } })
          } else {
            throw 'Product not found'
          }
        })
        .then(() => {
          res.redirect(`/?boughtProduct=${boughtProduct.name}`)
        })
        .catch((err) => {
          res.send(err)
        })
    }else{
      res.redirect('/login?sessionNotFound=true')
    }
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
    let UserId = req.params.userId

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
        res.redirect(`/product/${UserId}`)
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static listProduct(req, res) {
    const { search, sortBy } = req.query
    let option = {
      include: [User, Category],
      where: {
        UserId: +req.params.userId,
        stock: {
          [Op.gt]: 0,
        },
      },
      order: [['updatedAt', 'DESC']],
    }

    if (sortBy === 'price') {
      option.order = [['price', 'DESC']]
    } else if (sortBy === 'name') {
      option.order = [['name', 'ASC']]
    } else if (sortBy === 'stock') {
      option.order = [['stock', 'ASC']]
    }
    if (search) {
      option.where.name = {
        [Op.iLike]: `%${search}%`,
      }
    }
    Product.findAll(option)
      .then((result) => {
        res.render('listProduct', { products: result })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static deleteProduct(req, res) {
    Product.destroy({
      where: {
        id: +req.params.productId,
      },
    })
      .then(() => {
        res.redirect(`/product/${+req.params.userId}`)
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static formEditProduct(req, res) {
    let product
    Product.findByPk(+req.params.productId, {
      include: Category,
    })
      .then((result) => {
        product = result
        return Category.findAll()
      })
      .then((result) => {
        res.render('formEditProduct', { category: result, product })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static updateProduct(req, res) {
    const { name, description, price, imageUrl, stock, CategoryId } = req.body
    Product.update(
      { name, description, price, imageUrl, stock, CategoryId },
      {
        where: {
          id: +req.params.productId,
        },
      }
    )
      .then(() => {
        res.redirect(`/product/${+req.params.userId}`)
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static listEmpty(req, res) {
    const { search } = req.query
    let option = {
      include: [User, Category],
      where: {
        UserId: +req.params.userId,
        stock: {
          [Op.gt]: 0,
        },
      },
      order: [['updatedAt', 'DESC']],
    }
    option.where = Product.scopeZeroStock()
    if (search) {
      option.where.name = {
        [Op.iLike]: `%${search}%`,
      }
    }
    Product.findAll(option)
      .then((result) => {
        res.render('listEmpty', { products: result })
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = Controller
