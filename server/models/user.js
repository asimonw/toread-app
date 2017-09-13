const mongoose = require('mongoose')

const UserSchema = {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true
  }
}

module.exports = mongoose.model('User', UserSchema)
