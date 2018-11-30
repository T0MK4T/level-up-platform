'use strict'

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const courseSchema = mongoose.Schema({
	title: {type: String, required: true},
	category: {type: String, required: true},
	author: {type: String, required: true},
	sections: {type: Array},
	created: {type: Date, default: Date.now},
	active: {type: Boolean, default: true}
});

const sectionSchema = mongoose.Schema({
	sectionNumber: {type: Number, required: true},
	sectionType: {type: String, required: true},
	content: {type: String},
	courseID: {type: mongoose.Schema.ObjectId, ref: 'Course'}
});

courseSchema.methods.serialize = function(){
	return {
		id: this._id,
		title: this.title,
		author: this.author,
		category: this.category,
		created: this.created,
		active: this.active
	};
};


sectionSchema.methods.serialize = function(){
	return {
		id: this._id,
		courseID: this.courseID,
		sectionNumber: this.sectionNumber,
		sectionType: this.sectionType,
		content: this.content
	};
};


const Course = mongoose.model('Course',courseSchema);
const Section = mongoose.model('Section',sectionSchema);

module.exports = {Course, Section};