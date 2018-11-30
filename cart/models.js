'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const cartSchema = mongoose.Schema({
	items: {type: Array},
	customer: {type: mongoose.Schema.ObjectId, ref: 'Student'},
});


cartSchema.methods.serialize = function(){
	return {
		id: this._id,
		items: this.items,
		customer: this.customer
	};
};



const Cart = mongoose.model('Cart',cartSchema);

module.exports = {Cart};