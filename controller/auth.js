const passport = require("passport");

exports.getLogIn = (req, res, next) => {
  const message = req.flash("error")[0];
  if (!req.isAuthenticated()) {
    res.render("login", {
      title: "Đăng nhập",
      message: `${message}`,
      user: req.user
    });
  } else {
    res.redirect("/");
  }
};

exports.postLogIn = (req, res, next) => {
  passport.authenticate("local-signin", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
};

exports.getSignUp = (req, res, next) => {
  const message = req.flash("error")[0];
  if (req.isAuthenticated) {
    res.render("register", {
      title: "Đăng ký",
      message: `${message}`,
      user: req.user
    });
  } else {
    res.redirect("/login");
  }
};

exports.postSignUp = (req, res, next) => {
  passport.authenticate("local-signup", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/register",
    failureFlash: true
  })(req, res, next);
};

exports.getLogOut = (req, res, next) => {
  req.logout();
  res.redirect("/login");
};
