const express = require('express');
const router = express.Router();
const models = require('../models');
const Promise = require('bluebird');
const db = models.db

const Place = models.place;
const Hotel = models.hotel;
const Restaurant = models.restaurant;
const Activity = models.activity;

module.exports = router;

router.get('/', (request,response,next) => {

	Promise.all([Place.findAll(),Hotel.findAll(),Restaurant.findAll(),Activity.findAll()])
	.spread((place, hotel, restaurant, activity)=>{
		response.render('home',	{
			Hotels: hotel,
			Restaurants: restaurant,
			Activities: activity
		})
	})


})
