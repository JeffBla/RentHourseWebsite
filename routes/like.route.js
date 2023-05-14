"use strict";

const express = require("express");
const router = new express.Router();

const userCtrl = require("../controllers/user.controller");
const likeCtrl = require("../controllers/like.controller");

/* eslint-disable no-unused-vars */
router.route("/check").post(likeCtrl.likeCheck);

router.route("/uncheck").post(likeCtrl.likeUncheck);

module.exports = router;
