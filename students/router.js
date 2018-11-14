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
  
});

router.get('/', jsonParser, (req, res) => {
  
});

router.post('/', jsonParser, (req, res) => {
  
  });


router.delete('/', jsonParser, (req, res) => {
  
});

module.exports = {router};