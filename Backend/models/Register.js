// models/user.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  dateofBirth:{type: String, required: true},
  email:    {type: String, required: true,unique: true},
  password: { type: String, required: true },

});

module.exports = mongoose.model('RegisterUserDetails', userSchema);
