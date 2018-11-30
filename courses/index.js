'use strict';
const {Course} = require('./models');
const {courseRouter} = require('./courseRouter');
const {sectionRouter} = require('./sectionRouter');

module.exports = {Course, courseRouter, sectionRouter};