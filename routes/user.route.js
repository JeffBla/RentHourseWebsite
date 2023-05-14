"use strict";

const express = require("express");
const router = new express.Router();
const passport = require("passport");

const userCtrl = require("../controllers/user.controller");
const houseCtrl = require("../controllers/house.controller");

const filter_data = require("../models/filter_data");

/* eslint-disable no-unused-vars */
router
  .route("/register")
  .get((req, res, next) => {
    res.render("register");
  })
  .post(userCtrl.userRegisterPost);

/* eslint-disable no-unused-vars */
router
  .route("/signin")
  .get(userCtrl.userSignInGet)
  .post(
    passport.authenticate("signin", {
      failureRedirect: "/user/signin",
      failureFlash: true,
    }),
    userCtrl.userSignInSuss
  );

router.route("/flashtest").get((req, res) => {
  req.flash("success_flash", "You are logged out");
  res.send(req.flash("success_flash"));
});

/* eslint-disable no-unused-vars */
router.route("/").get(userCtrl.ensureAuthenticated, (req, res) => {
  // console.log(req.user.id);
  // console.log(req.user.name);
  // console.log(req.user.password);
  // console.log(req.user.email);
  console.log(JSON.stringify(req.user));
  res.render("userHome", {
    filter_data: filter_data,
  });
});

/* eslint-disable no-unused-vars */
router
  .route("/signout")
  .post(userCtrl.ensureAuthenticated, (req, res, next) => {
    // clear req.user property and clear the login session (if any).
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });

router.route("/favorite").post(houseCtrl.GetFavorRentInfo);

module.exports = router;
