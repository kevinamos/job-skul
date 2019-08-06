const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Firstname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  Lastname: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
