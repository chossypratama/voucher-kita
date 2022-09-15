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

    priceRupiah() {
      return toRupiah(this.price);
    }

    static scopeZeroStock() {
      return {
        stock: {
          [Op.eq]: 0,
        },
      };
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
