'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

const { Section } = require('./models');
const sectionRouter = express.Router();
const jsonParser = bodyParser.json();

sectionRouter.get('/', jsonParser,(req, res) => {
  Section.findOne()
  	.then(course => res.json(course))
  	.catch(err => {
  		console.log(err);
  		res.status(500).json({message: 'Server Error'})
  	})
});

sectionRouter.post('/', jsonParser, (req, res) => {
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
  return Section.create({
  	title,
  	author,
  	category,
  	content
  });
});

module.exports = {sectionRouter};