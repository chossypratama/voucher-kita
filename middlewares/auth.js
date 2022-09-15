const isLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect("/login?sessionNotFound=true");
  } else {
    next();
  }
};

const isSeller = (req, res, next) => {
  if (req.session.user.role !== "seller") {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = { isLogin, isSeller };
