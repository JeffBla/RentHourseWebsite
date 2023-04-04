'use strict';

const express = require('express');
const router = new express.Router();
const Repository = require('../src/repository');

/* eslint-disable no-unused-vars */
router.get('/', (req, res, next) => {
	const repo = new Repository('Supa Testing user');
	res.render('index', { houses: repo.getHouses() });
});
/* eslint-disable no-unused-vars */

router.post('/submit', (req, res, next) => {
	console.log('選擇縣市：'+req.body.county);
	console.log('選擇區域：'+req.body.district);
	console.log('選擇型態：'+req.body.type);
	console.log('選擇租金：'+req.body.price);
});

module.exports = router;
