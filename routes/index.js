"use strict";

const express = require("express");
const router = new express.Router();
const Repository = require("../src/repository");
// test for db
const db = require("../query");

/* eslint-disable no-unused-vars */
router.get('/', (req, res, next) => {
	const repo = new Repository('Supa Testing user');
	res.render('index', { houses: repo.getHouses() });

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

module.exports = router;
