"use strict";

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

const { errors } = require("pg-promise")(/* initOptions */);
const userModel = require("./models/user.model");

const homeRoute = require("./routes/index.route.js");
const userRoute = require("./routes/user.route.js");
const likeRoute = require("./routes/like.route.js");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 透過 passport.user() 建立驗證機制
passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      // 讓 varify callback 函式可以取得 req 物件
      passReqToCallback: true,
    },
    // Varify Callback: 新增 req 引數
    async (req, username, password, done) => {
      let user = await userModel.CheckUser(username);
      if (user == null) {
        return done(null, false, req.flash("error_flash", "User not found."));
      } else {
        if (!bcrypt.compareSync(password, user.password)) {
          return done(
            null,
            false,
            req.flash("error_flash", "Invalid password")
          );
        }
        return done(null, user);
      }
    }
  )
);

app.use(
  session({
    secret: "nksnfoiehhrekwqnrlkje",
    resave: "false",
    saveUninitialized: "false",
    cookie: {
      maxAge: 86400000, // session的存活時間，24hr，單位毫秒
    },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);
// 初始化 Passport
app.use(passport.initialize());
// 如果要使用 login session 時需設定
app.use(passport.session());

passport.serializeUser(function (user, done) {
  // 只將用戶 id 序列化存到 session 中
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // 透過使用者 id 到 DB尋找用戶完整資訊
  userModel
    .CheckUserById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
});

app.use(flash());
// setup local variables so we can use it anywhere in our app
app.use(function (req, res, next) {
  res.locals.success_flash = req.flash("success_flash");
  res.locals.error_flash = req.flash("error_flash");
  res.locals.currentUser = req.user || null;
  next();
});

app.use("/", homeRoute);
app.use("/user", userRoute);
app.use("/like", likeRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/* eslint-disable no-unused-vars */
if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err,
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("404");
});
/* eslint-enable no-unused-vars */

module.exports = app;
