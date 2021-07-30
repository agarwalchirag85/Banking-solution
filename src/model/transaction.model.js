const mongoose = require("mongoose");

// Transaction Schema
const transactionSchema = new mongoose.Schema(
  {
    transfertype:{
        type:String,
        required:true,
        trim: true,
    },

    accountfrom :{
      type: Number,
      trim: true,
    },

    accountto :{
        type: Number,
        trim: true,
      },

    transferdate: {
      type: Date,
      required: true,
      trim: true,
    },
  }
);

const Transaction=mongoose.model('Transaction', transactionSchema);
module.exports = {Transaction};