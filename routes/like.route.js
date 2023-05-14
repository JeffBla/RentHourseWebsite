"use strict";

const express = require("express");
const router = new express.Router();

const userCtrl = require("../controllers/user.controller");
const likeCtrl = require("../controllers/like.controller");

/* eslint-disable no-unused-vars */
router.route("/check").post(userCtrl.ensureAuthenticated, likeCtrl.likeCheck);

router.route("/uncheck").delete(likeCtrl.likeUncheck);

// router.route("/userlikerent").post();

module.exports = router;
