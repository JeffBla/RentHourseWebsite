"use strict";

const express = require("express");
const router = new express.Router();
const passport = require("passport");

const userCtrl = require("../controllers/user.controller");

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
  res.render("userHome");
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

router.route("/flashtest").get((req, res) => {
  req.flash("success_flash", "You are logged out");
  res.send(req.flash("success_flash"));
});

module.exports = router;
