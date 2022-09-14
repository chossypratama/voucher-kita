const { User, UserProfile, Product, Category } = require("../models");

class Controller {
  static formAdd(req, res) {
    Category.findAll()
      .then((result) => {
        // res.send(result);
        res.render("formAddProduct", { categories: result });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static createProduct(req, res) {}
}

module.exports = Controller;
