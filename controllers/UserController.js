const { response } = require('express')
const { User, UserProfile } = require('../models')
const bcrypt = require('bcryptjs')

class UserController {
  static registerForm(req, res) {
    res.render('auth-pages/register-form.ejs')
  }

  static postRegister(req, res) {
    // create user : username, email, password, role
    // create userProfile : gender, phoneNumber, imageUrl?, age, UserId (promise dari hasil user)
    const { username, email, password, role, gender, phoneNumber, age } = req.body
    User.findOne({ where: { email } })
      .then((existUser) => {
        if (!existUser) {
          return User.create({ username, email, password, role })
        } else {
          throw '<h3>Email has been exists! Try other email!</h3>'
        }
      })
      .then((user) => {
        return UserProfile.create({ gender, phoneNumber, age, UserId: user.id })
      })
      .then((res) => {
        res.redirect('/login?afterRegister=true')
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static loginForm(req, res) {
    const { invalid, afterRegister, sessionNotFound } = req.query

    res.render('auth-pages/login-form.ejs', { invalid, afterRegister, sessionNotFound })
  }

  static postLogin(req, res) {
    const { email, password } = req.body
    findOne({ where: { email } }).then((user) => {
      if (user) {
        const isValid = bcrypt.compareSync(password, user.password)

        if (isValid) {
          // assign to session
          req.session.userId = user.id

          return res.redirect('/')
        } else {
          return res.redirect('/login?invalid=true')
        }
      } else {
        return res.redirect('/login?invalid=true')
      }
    })
  }
}

module.exports = UserController
