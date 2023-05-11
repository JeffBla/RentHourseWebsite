"use strict";

const express = require("express");
const router = new express.Router();
const houseCtrl = require("../controllers/house.controller");

/* eslint-disable no-unused-vars */
router.route("/").get((req, res) => {
  res.send("user");
});

/* eslint-disable no-unused-vars */
router
  .route("/register")
  .get((req, res, next) => {
    res.render("register");
  })
  .post((req, res, next) => {
    const { username, email, password, confirmedpassword } = req.body;
    // 在這裡處理註冊表單提交的數據
    // ...
    res.redirect("/user/signin"); // 跳轉到signin頁面
  });

/* eslint-disable no-unused-vars */
router
  .route("/signin")
  .get((req, res, next) => {
    res.render("signin");
  })
  .post((req, res, next) => {
    const { username, email, password } = req.body;
    // 在這裡處理註冊表單提交的數據
    // ...
    res.redirect("/"); // 跳轉到主頁面
  });

router.route("/test").get((req, res) => {
  res.send("test");
});

module.exports = router;
