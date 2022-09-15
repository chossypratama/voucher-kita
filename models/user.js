'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: 'UserId' })
      User.hasOne(models.UserProfile, { foreignKey: 'UserId' })
    }

    hashing(password) {
      let salt = bcrypt.genSaltSync(10)
      let hash = bcrypt.hashSync(password, salt)
      return hash
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Username tidak boleh kosong!',
          },
          notEmpty: {
            msg: 'Username tidak boleh kosong!',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Email tidak boleh kosong!',
          },
          notEmpty: {
            msg: 'Email tidak boleh kosong!',
          },
          isEmail: {
            msg: 'Silahkan gunakan email yang valid!',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password tidak boleh kosong!',
          },
          notEmpty: {
            msg: 'Password tidak boleh kosong!',
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
    
  )
  User.addHook('beforeCreate', (user) => {
    user.password = user.hashing(user.password)
  })
  return User
}
