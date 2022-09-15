const { User, UserProfile } = require('../models')
const bcrypt = require('bcryptjs')

class UserControllers {
  static registerForm(req, res) {
    const { errors } = req.query

    res.render('auth-pages/register-form.ejs', { errors })
  }

  static postRegister(req, res) {
    // create user : username, email, password, role
    // create userProfile : gender, phoneNumber, age, UserId (promise dari hasil user)
    const { username, email, password, role, gender, phoneNumber, age } = req.body
    User.findOne({ where: { email } })
      .then((existUser) => {
        if (!existUser) {
          return User.create({ username, email, password, role })
        } else {
          throw `Email sudah ada! Silahkan coba email lain!`
        }
      })
      .then((user) => {
        return UserProfile.create({ gender, phoneNumber, age, UserId: user.id })
      })
      .then(() => {
        res.redirect('/login?afterRegister=true')
      })
      .catch((err) => {
        if (err.name == 'SequelizeValidationError') {
          const errors = err.errors.map((e) => {
            return e.message
          })
          res.redirect(`/register?errors=${errors}`)
        } else if (typeof err == 'string') {
          res.redirect(`/register?errors=${err}`)
        } else {
          console.log(JSON.stringify(err))
          res.send(err)
        }
      })
  }

  static loginForm(req, res) {
    const { invalid, afterRegister, sessionNotFound } = req.query

    res.render('auth-pages/login-form.ejs', { invalid, afterRegister, sessionNotFound })
  }

  static postLogin(req, res) {
    const { email, password } = req.body
    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const isValid = bcrypt.compareSync(password, user.password)

          if (isValid) {
            // assign to session
            req.session.user = {
              id: user.id,
              role: user.role,
              username: user.username,
            }
            // console.log(req.session)

            return res.redirect('/')
          } else {
            return res.redirect('/login?invalid=true')
          }
        } else {
          return res.redirect('/login?invalid=true')
        }
      })
      .catch((err) => {
        console.log(err)
        res.send(err)
      })
  }

  static getLogout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.send(err)
      } else {
        res.redirect('/?isLogout=true')
      }
    })
  }
}

module.exports = UserControllers
