'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const studentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, required: true, unique: true},
  password: {type:String, required: true},
  created: {type: Date, default: Date.now}
});


studentSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`.trim();
});

studentSchema.methods.validatePassword = function(password){
  return bcrypt.compare(password, this.password);
};

studentSchema.statics.hashPassword = function(password){
  return bcrypt.hash(password, 10);
};

studentSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.fullName,
    email: this.email
  };
};

const Student = mongoose.model('Student', studentSchema);

module.exports = {Student};