const { Op } = require("sequelize");
const { User, UserProfile, Product, Category } = require("../models");

class Controller {
  static home(req, res) {
    const userSession = req.session.user;
    const { search, sort, param, isLogout } = req.query;

    Product.findAll({ include: Category, User })
      .then((products) => {
        // res.send(products);
        res.render("home.ejs", { products, userSession });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static formAdd(req, res) {
    // const { errors } = req.query;
    const userSession = req.session.user;
    Category.findAll()
      .then((result) => {
        // res.send(userSession);
        res.render("formAddProduct", {
          categories: result,
          userSession,
        });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static createProduct(req, res) {
    const userSession = req.session.user;
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
        res.redirect(`/product/${UserId}`);
      })
      .catch((err) => {
        // if (err.name == "SequelizeValidationError") {
        //   err = err.errors.map((el) => el.message);
        //   // res.redirect(`/product/${userSession.id}/add?errors=${err}`);
        //   res.send(err);
        // } else {
        res.send(err);
        // }
      });
  }

  static listProduct(req, res) {
    const userSession = req.session.user;
    const { search, sortBy } = req.query;
    let option = {
      include: [User, Category],
      where: {
        UserId: +req.params.userId,
        stock: {
          [Op.gt]: 0,
        },
      },
      order: [["updatedAt", "DESC"]],
    };

    if (sortBy === "price") {
      option.order = [["price", "DESC"]];
    } else if (sortBy === "name") {
      option.order = [["name", "ASC"]];
    } else if (sortBy === "stock") {
      option.order = [["stock", "ASC"]];
    }
    if (search) {
      option.where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }
    Product.findAll(option)
      .then((result) => {
        // res.send(userSession);
        res.render("listProduct", { products: result, userSession });
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
    const userSession = req.session.user;
    let product;
    Product.findByPk(+req.params.productId, {
      include: Category,
    })
      .then((result) => {
        product = result;
        return Category.findAll();
      })
      .then((result) => {
        res.render("formEditProduct", {
          category: result,
          product,
          userSession,
        });
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

  static listEmpty(req, res) {
    const userSession = req.session.user;
    const { search } = req.query;
    let option = {
      include: [User, Category],
      where: {
        UserId: +req.params.userId,
        stock: {
          [Op.gt]: 0,
        },
      },
      order: [["updatedAt", "DESC"]],
    };
    option.where = Product.scopeZeroStock();
    if (search) {
      option.where.name = {
        [Op.iLike]: `%${search}%`,
      };
    }
    Product.findAll(option)
      .then((result) => {
        res.render("listEmpty", { products: result, userSession });
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = Controller;
