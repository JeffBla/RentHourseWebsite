'use strict';

const express = require('express');
const router = new express.Router();
const Repository = require('../src/repository');

/* eslint-disable no-unused-vars */
router.get('/', (req, res, next) => {
	const repo = new Repository('Supa Testing user');
	res.render('index', { houses: repo.getHouses() , filter_data: require('../filter_data.js')});
});
/* eslint-disable no-unused-vars */
router.get('/signin', (req, res, next) => {
	res.render('signin');
});
/* eslint-disable no-unused-vars */
router.get('/favorites', (req, res, next) => {
	const repo = new Repository('Supa Testing user');
	res.render('favorites', { houses: repo.getHouses()});
});
/* eslint-disable no-unused-vars */

router.post('/submit', (req, res, next) => {
	console.log('data:\n'+JSON.stringify(req.body));
	const repo = new Repository('Supa Testing user');
	let sample_send_data = repo.getHouses();
	sample_send_data.pop();
	sample_send_data.pop();
	res.json(sample_send_data);
});

module.exports = router;
