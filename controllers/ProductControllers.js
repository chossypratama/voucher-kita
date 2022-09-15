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
    let UserId = 8; //<<<UserId 8 sebagai Seller
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
        res.redirect("/add");
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
