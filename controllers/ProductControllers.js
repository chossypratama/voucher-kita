const { User, UserProfile, Product, Category } = require("../models");

class Controller {
  static formAdd(req, res) {
    Category.findAll()
      .then((result) => {
        res.render("formAddProduct", { categories: result });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static createProduct(req, res) {
    const { name, description, price, imageUrl, stock, CategoryId } = req.body;
    let UserId = req.params.userId;
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
        res.redirect(`/product/${UserId}/add`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static listProduct(req, res) {
    Product.findAll({
      include: [User, Category],
      where: {
        UserId: +req.params.userId,
      },
    })
      .then((result) => {
        // res.send(result);
        res.render("listProduct", { products: result });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static deleteProduct(req, res) {
    Product.destroy({
      where: {
        id: +req.params.productId,
      },
    })
      .then(() => {
        res.redirect(`/product/${+req.params.userId}`);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static formEditProduct(req, res) {
    let product;
    Product.findByPk(+req.params.productId, {
      include: Category,
    })
      .then((result) => {
        product = result;
        return Category.findAll();
      })
      .then((result) => {
        res.render("formEditProduct", { category: result, product });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static updateProduct(req, res) {
    const { name, description, price, imageUrl, stock, CategoryId } = req.body;
    Product.update(
      { name, description, price, imageUrl, stock, CategoryId },
      {
        where: {
          id: +req.params.productId,
        },
      }
    )
      .then(() => {
        res.redirect(`/product/${+req.params.userId}`);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
