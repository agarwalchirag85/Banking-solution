const express = require("express");
const router = express.Router();
const transactionController = require("../../controller/transaction.controller");

//Post deposit request to controller
router.post("/deposit", async (req, res, next) => { 
    await transactionController.postDeposit(req,res,next) ;
  });

//Post withdraw request to controller
router.post("/withdraw", async (req, res, next) => {  
    await transactionController.postWithdraw(req,res,next) ;
});

//Post transfer request to controller
router.post("/transfer",async (req, res, next) => {  
    await transactionController.postTransfer(req,res,next) ;
});

module.exports = router;