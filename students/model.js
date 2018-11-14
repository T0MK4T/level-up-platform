'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const studentSchema = mongoose.Schema({
  name: {
    firstName: String,
    lastName: String
  },
  email: {type: String, required: true},
  created: {type: Date, default: Date.now}
});


studentSchema.virtual('fullName').get(function() {
  return `${this.name.firstName} ${this.name.lastName}`.trim();
});

studentSchema.methods.serialize = function() {
  return {
    id: this._id,
    studentName: this.fullName,
    email: this.email,
    created: this.created
  };
};

const Student = mongoose.model('Student', studentSchema);

module.exports = {Student};