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
  .get((req, res, next) => {
    res.render("signin");
  })
  .post(
    passport.authenticate("signin", {
      failureRedirect: "/user/signin",
      failureFlash: true,
    }),
    userCtrl.userSignInSuss
  );

router.route("/test").get((req, res) => {
  req.flash("success_flash", "You are logged out");
  res.send(req.flash("success_flash"));
});

/* eslint-disable no-unused-vars */
router.route("/id/:username").get((req, res) => {
  res.send("user");
});

module.exports = router;
