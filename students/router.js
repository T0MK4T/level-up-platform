'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

const { Student } = require('./model');
const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', jsonParser,(req, res) => {
  Student.findOne()
  	.then(student => res.json(student))
  	.catch(err => {
  		console.log(err);
  		res.status(500).json({message: 'Server Error'})
  	})
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['email','password'];
  const missingFields = requiredFields.find(field => !(field in req.body));

  if(missingFields){
  	return res.status(422).json({
  		code: 422,
  		reason: 'Error',
  		message: 'Missing fields',
  		location: missingFields
  	});
  }

  let { email, password} = req.body;

  return Student.find({email})
  	.then(count => {
  		if (count>0){
  			return Promise.reject({
  				code: 422,
  				reason: 'ValidationError',
  				message: 'email already taken',
  				location: 'email'
  			});
  		}
  		return Student.hashPassword(password);
  	})
  	.then(hash => {
  		return Student.create({
  			email,
  			password: hash
  		});
  	})
  	.then(user=> {
  		return res.status(201).json(user.serialize());
  	})
  	.catch(err =>{
  		console.log(err);

  		if(err.reason === 'ValidationError'){
  			return res.status(err.code).json(err);
  		}
  		res.status(500).json({code: 500, message: 'Server Error'});
  	});
  });


router.delete('/', jsonParser, (req, res) => {
  
});

module.exports = {router};