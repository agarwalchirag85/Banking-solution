const mongoose = require("mongoose");


const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: "Amit Dugal",
  accountno: 1001,
  balance: 0,
 
};

const userTwo = {
    _id: mongoose.Types.ObjectId(),
    name: "Gauri Kalla",
    accountno: 1002,
    balance: 0,
  
};

module.exports = {
  userOne,
  userTwo,
};
