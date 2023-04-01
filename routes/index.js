"use strict";

const express = require("express");
const router = new express.Router();
const Repository = require("../src/repository");

/* eslint-disable no-unused-vars */
router.get("/", (req, res, next) => {
  const repo = new Repository("Supa Testing user");
  res.render("index", { title: "Express", name: repo.getData() });
});

// if want to render ejs file, just code like this
// for font-end
router.get("/test", (req, res, next) => {
  res.render("index", { title: "Express", name: repo.getData() });
});
/* eslint-disable no-unused-vars */

module.exports = router;
