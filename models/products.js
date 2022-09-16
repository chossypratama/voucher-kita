"use strict";
const { Model, Op } = require("sequelize");
const toRupiah = require("../helpers/formatIDR");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.belongsTo(models.User, { foreignKey: "UserId" });
    }

    get priceRupiah() {
      return toRupiah(this.price);
    }

    static scopeZeroStock() {
      return {
          [Op.eq]: 0,
        }
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter your name product",
          },
          notNull: {
            msg: "Please enter your name product",
          },
          len: {
            args: [5, 30],
            msg: "min caracter name product between 5 and 30",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter your product description",
          },
          notNull: {
            msg: "Please enter your product description",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter your price",
          },
          notNull: {
            msg: "Please enter your price",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter your stock",
          },
          notNull: {
            msg: "Please enter your stock",
          },
        },
      },
      UserId: DataTypes.INTEGER,
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please choose category",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please enter your image",
          },
          notNull: {
            msg: "Please enter your image",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
