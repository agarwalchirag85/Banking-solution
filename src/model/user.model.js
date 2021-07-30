const mongoose = require("mongoose");

// User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    accountno :{
      type: Number,
      required:true,
      trim: true,
    },
    balance: {
      type: Number,
      required: true,
      trim: true,
    },
  }
);

const User=mongoose.model('User', userSchema);
module.exports = {User};