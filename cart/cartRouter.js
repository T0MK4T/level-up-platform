'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

const { Cart } = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', jsonParser,(req, res) => {
  Cart.findOne()
  	.then(course => res.json(cart))
  	.catch(err => {
  		console.log(err);
  		res.status(500).json({message: 'Server Error'})
  	})
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title','author','category'];
  const missingFields = requiredFields.find(field => !(field in req.body));

  if(missingFields){
  	return res.status(422).json({
  		code: 422,
  		reason: 'Error',
  		message: 'Missing fields',
  		location: missingFields
  	});
  }

  let { title, author, category, content} = req.body;
  return Course.create({
  	title,
  	author,
  	category,
  	content
  });
});

module.exports = {router};