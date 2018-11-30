'use strict';

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;

const { Student } = require('./models');
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

  let { email, password, firstName, lastName} = req.body;

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
        firstName,
        lastName,
  			password: hash
  		});
  	})
  	.then(student=> {
  		return res.status(201).json(student.serialize());
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
  let { email } = req.body;
    console.log(email);

    Student.findOne({email})
        .then(student => {
            console.log(student);
            if(student != null && Object.keys(student).length > 0) {
                Student.deleteOne(student)
                    .then(res.status(202).json({message: 'Success'}))
                    .catch(err => {
                            console.log(err);
                            res.status(500).json({message: 'Error deleting student'})
                        })
            }
            else {
                res.status(500).json({message: 'Student not found'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: 'Error in request'})
        })
});

module.exports = {router};