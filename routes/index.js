"use strict";

const express = require("express");
const router = new express.Router();
const houseCtrl = require("../controllers/house.controller");

/* eslint-disable no-unused-vars */
router.get("/", (req, res, next) => {
  const repo = new Repository("Supa Testing user");
  res.render("index", { houses: repo.getHouses() });
});

router.route("/test").get(houseCtrl.test);

/* eslint-disable no-unused-vars */

module.exports = router;
