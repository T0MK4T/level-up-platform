'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

const { Courses } = require('./model');
const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', jsonParser,(req, res) => {
  Courses.findOne()
  	.then(student => res.json(student))
  	.catch(err => {
  		console.log(err);
  		res.status(500).json({message: 'Server Error'})
  	})
});

module.exports = {router};