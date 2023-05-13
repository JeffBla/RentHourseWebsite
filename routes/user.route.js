"use strict";

const express = require("express");
const router = new express.Router();
const houseCtrl = require("../controllers/house.controller");
const bcrypt = require('bcrypt');

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
  .post(async (req, res, next) => {
    console.log(req.body);
    const { username, email, password, confirmedpassword } = req.body;
    if (password !== confirmedpassword) {
      return res.status(400).json({ message: '密碼不一致' });
    }

    // 生成salt
    const salt = await bcrypt.genSalt();

    // 加密密碼
    const encryptedPassword  = await bcrypt.hash(req.body.password, salt);

    res.redirect("/user/signin"); // 跳轉到signin頁面
  });

/* eslint-disable no-unused-vars */
router
  .route("/signin")
  .get((req, res, next) => {
    res.render("signin");
  })
  .post(async (req, res, next) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    // 在這裡從資料庫中取得salt，然後將密碼和salt進行加密
    const user = {
      username,
      email,
      password: "從資料庫中取得的加密後的密碼",
      salt: "從資料庫中取得的salt"
    };
    const match = await bcrypt.compare(password, user.password);
    // 在這裡進行登入驗證
    if (match) {
      // 登入成功
      res.redirect("/");
    } else {
      // 登入失敗
      res.redirect("/user/signin");
    }
  });

router.route("/test").get((req, res) => {
  res.send("test");
});

module.exports = router;
