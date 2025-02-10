const mongoose = require('mongoose');

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'default.jpg'
  }
});

const AttendanceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  Date: {
    type: Date,
    required: true
  }
});

const Admin = mongoose.model('Admin', adminSchema);
const User = mongoose.model('User', userSchema);
const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = { Admin, User, Attendance };