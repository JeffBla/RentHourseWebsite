"use strict";

const express = require("express");
const router = new express.Router();

const userCtrl = require("../controllers/user.controller");

/* eslint-disable no-unused-vars */
router.route("/check").post(userCtrl.ensureAuthenticated);
router.route("/uncheck").post();

module.exports = router;
