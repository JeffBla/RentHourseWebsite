"use strict";

const express = require("express");
const router = new express.Router();
const houseCtrl = require("../controllers/house.controller");

/* eslint-disable no-unused-vars */
router.route("/").get((req, res) => {
  res.send("user");
});

router.route("/favorites").get((req, res) => {
  res.send("favorites");
  // res.render("favorites", { houses: repo.getHouses() });
});

router.route("/test").get((req, res) => {
  res.send("test");
});

module.exports = router;
