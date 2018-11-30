'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

const { Course } = require('./models');
const courseRouter = express.Router();
const jsonParser = bodyParser.json();

courseRouter.get('/', jsonParser,(req, res) => {
  Course.findOne()
  	.then(course => res.json(course))
  	.catch(err => {
  		console.log(err);
  		res.status(500).json({message: 'Server Error'})
  	})
});

courseRouter.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title','author','category','content'];
  const missingFields = requiredFields.find(field => !(field in req.body));

  if(missingFields){
  	return res.status(422).json({
  		code: 422,
  		reason: 'Error',
  		message: 'Missing fields',
  		location: missingFields
  	});
  }

  let { title, img, author, category, content} = req.body;
  return Course.create({
  	title,
    img,
  	author,
  	category,
  	content
  });
});

module.exports = {courseRouter};