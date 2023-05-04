"use strict";

const express = require("express");
const router = new express.Router();
const houseCtrl = require("../controllers/house.controller");

/* eslint-disable no-unused-vars */
router.route("/").get(houseCtrl.houseSelect);

router.route("/test").get(houseCtrl.test);

/* eslint-disable no-unused-vars */
router.get("/signin", (req, res, next) => {
  res.render("signin");
});

/* eslint-disable no-unused-vars */
router.route("/submit").post((req, res, next) => {
  console.log("data:\n" + JSON.stringify(req.body));
});

module.exports = router;
