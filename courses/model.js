'use strict'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const courseSchema = mongoose.Schema({
	title: {type: String, required: true},
	category: {type: String, required: true},
	author: {type: String, required: true},
	content: {type: String},
	created: {type: Date, default: Date.now}
});

const sectionSchema = mongoose.Schema({
	sectionNumber: {type: Number, required: true},
	sectionType: {type: String, required: true},
	courseID: {type: mongoose.Schema.ObjectId, ref: 'Course'}
});

courseSchema.methods.serialize = function(){
	return {
		id: this._id,
		title: this.title,
		author: this.author,
		category: this.category,
		content: this.content,
		created: this.created
	};
};


sectionSchema.methods.serialize = function(){
	return {
		id: this._id,
		courseID: this.courseID,
		sectionNumber: this.sectionNumber,
		sectionType: this.sectionType
	};
};


const Course = mongoose.model('Course',courseSchema);
const Section = mongoose.model('Section',sectionSchema);

module.exports = {Course, Section};