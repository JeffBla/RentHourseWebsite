"use strict";

const express = require("express");
const router = new express.Router();

const userCtrl = require("../controllers/user.controller");
const likeCtrl = require("../controllers/like.controller");
const { like } = require("../SQL/sql");

/* eslint-disable no-unused-vars */
router.route("/check").post(userCtrl.ensureAuthenticated, likeCtrl.likeCheck);

router.route("/uncheck").post();

module.exports = router;
