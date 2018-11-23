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

const Course = mongoose.model('Course',courseSchema);
module.exports = {Course};