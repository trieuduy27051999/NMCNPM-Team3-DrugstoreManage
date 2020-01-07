require("dotenv").config();

//require("./util/createUser");
// require("./util/createProduct");

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var adminRouter = require("./routes/drugstore");
const urlConnect = process.env.DB;
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ uri: process.env.DB, collection: "sessions" }),
    cookie: { maxAge: 180 * 60 * 1000 }
  })
);

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

mongoose.connect(
  urlConnect,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) throw err;
    console.log("Connect successfully!");
  }
);

app.use(flash());

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.use("/", adminRouter); //route admin

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
