const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  age: {
    type: Number,
    required: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
