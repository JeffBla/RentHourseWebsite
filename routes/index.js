"use strict";

const express = require("express");
const router = new express.Router();
const Repository = require("../src/repository");
// test for db
const db = require("../query");

/* eslint-disable no-unused-vars */
router.get("/", (req, res, next) => {
  const repo = new Repository("Supa Testing user");
  res.render("index", {
    houses: repo.getHouses(),
    filter_data: require("../filter_data.js"),
  });
});

router.get("/db", (req, res, next) => {
  db.query("Select * From ${table:name}", {
    table: "houseinfo",
  }).then((data) => {
    res.send(data);
  });
});

// if want to render ejs file, just code like this
// for font-end
router.get("/test", (req, res, next) => {
  res.render("index", { title: "Express", name: "TEST" });
});
/* eslint-disable no-unused-vars */
router.get("/signin", (req, res, next) => {
  res.render("signin");
});
/* eslint-disable no-unused-vars */
router.get("/favorites", (req, res, next) => {
  const repo = new Repository("Supa Testing user");
  res.render("favorites", { houses: repo.getHouses() });
});
/* eslint-disable no-unused-vars */

router.post("/submit", (req, res, next) => {
  console.log("選擇縣市：" + req.body.county);
  console.log("選擇區域：" + req.body.district);
  console.log("選擇型態：" + req.body.type);
  console.log("選擇租金：" + req.body.price);
});

module.exports = router;
