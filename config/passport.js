const User = require("../model/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    })
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        console.log(err);
      });
  });

  passport.use(
    "local-signin",
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Sai tên đăng nhập hoặc mật khẩu."
          });
        }

        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return done(err);
          }
          console.log(
            "acc : " + user.username + " " + user.password + " " + password,
            result
          );
          if (!result) {
            return done(null, false, {
              message: "Sai tên đăng nhập hoặc mật khẩu."
            });
          }

          return done(null, user);
        });
      });
    })
  );

  passport.use(
    "local-signup",
    new LocalStrategy({ passReqToCallback: true }, function(
      req,
      username,
      password,
      done
    ) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, {
            message: "Tên đăng nhập đã tồn tại!"
          });
        }

        if (password.length <= 6) {
          return done(null, false, {
            message: "Mật khẩu phải trên 6 ký tự!"
          });
        }

        if (password !== req.body.password2) {
          return done(null, false, {
            message: "Hai mật khẩu không khớp!"
          });
        }

        bcrypt.hash(password, 12).then(hashPassword => {
          var role = 0;
          if (req.body.isAdmin == "on") {
            role = 1;
          }
          const newUser = new User({
            username: username,
            password: hashPassword,
            name: req.body.name,
            role: role,
            address: req.body.address,
            phoneNumber: req.body.phone
          });
          // save the user
          newUser.save(function(err) {
            if (err) return done(err);
            return done(null, newUser);
          });
        });
      });
    })
  );
};
