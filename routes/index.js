"use strict";

const express = require("express");
const router = new express.Router();
const houseCtrl = require("../controllers/house.controller");

/* eslint-disable no-unused-vars */
router.route("/").get(houseCtrl.houseSelect).post();

router.route("/test").get(houseCtrl.test);

/* eslint-disable no-unused-vars */
router.get("/signin", (req, res, next) => {
  res.render("signin");
});
/* eslint-disable no-unused-vars */
router.get("/favorites", (req, res, next) => {
  res.send("favorites");
  // res.render("favorites", { houses: repo.getHouses() });
});
/* eslint-disable no-unused-vars */
router.get('/register', (req, res, next) => {
	res.render('register');
});
/* eslint-disable no-unused-vars */
router.post('/register', (req, res, next) => {
	const { username, email, password, confirmedpassword } = req.body;
	// 在這裡處理註冊表單提交的數據
	// ...
	res.redirect('/signin'); // 跳轉到signin頁面
});

router.post('/signin', (req, res, next) => {
	const { username, email, password} = req.body;
	// 在這裡處理註冊表單提交的數據
	// ...
});


router.post("/submit", (req, res, next) => {
  console.log("data:\n" + JSON.stringify(req.body));
});

module.exports = router;
