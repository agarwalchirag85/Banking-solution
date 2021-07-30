const httpStatus = require("http-status");
const { transactionService } = require("../service");

//Make Deposit request to service 
const postDeposit = async (req, res,next) => {
  
    const postdeposittodb= await transactionService.postDepositService(req);
  
    if(postdeposittodb==='NUM_OF_TRANSACTIONS_EXCEEDED')
    {
      return res.status(httpStatus.BAD_REQUEST).send({"message":"Account number already deposited 3 times in a day"});

    }
    else if(postdeposittodb==='ACCOUNT_NUMBER_ISSUE')
    {
        return res.status(httpStatus.BAD_REQUEST).send({"message":"Invalid account number"});
    }
    else if(postdeposittodb==='AMOUNT_ISSUE')
    {
        return res.status(httpStatus.BAD_REQUEST).send({"message":"Deposit more than 500 and less than 50000"});
    }
    else if(postdeposittodb==='AMOUNT_EXCEEDED_1LAKH')
    {
      return res.status(httpStatus.BAD_REQUEST).send({"message":"Account balance will be more than 1 lakh so not possible"});
    }
    else if(postdeposittodb!==[]){
        return res.status(httpStatus.CREATED).send({"account balance" : postdeposittodb.balance});
      }
    else
    {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({"message":"Internal service error"});
    }
  
  };

//Make withdrawal request to service 
const postWithdraw = async (req, res,next) => {
    
      const postwithdrawtodb= await transactionService.postWithdrawService(req);
      
      if(postwithdrawtodb==='NUM_OF_TRANSACTIONS_EXCEEDED')
      {
        return res.status(httpStatus.BAD_REQUEST).send({"message":"Account number already withdrawed 3 times in a day"});

      }
      else if(postwithdrawtodb==='ACCOUNT_NUMBER_ISSUE')
      {
          return res.status(httpStatus.BAD_REQUEST).send({"message":"Invalid account number"});
      }
      else if(postwithdrawtodb==='AMOUNT_ISSUE')
      {
          return res.status(httpStatus.BAD_REQUEST).send({"message":"Withdraw more than 1000 and less than 25000"});
      }
      else if(postwithdrawtodb==='AMOUNT_NEGATIVE')
      {
        return res.status(httpStatus.BAD_REQUEST).send({"message":"Account balance is insufficient so not possible"});
      }
      else if(postwithdrawtodb!==[]){
          return res.status(httpStatus.CREATED).send({"account balance" : postwithdrawtodb.balance});
        }
      else
      {
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({"message":"Internal service error"});
      }

  };

//Make Transfer request to service 
const postTransfer = async (req, res,next) => {
  
    const posttransfertodb= await transactionService.postTransferService(req);
        
    if(posttransfertodb==='NUM_OF_TRANSACTIONS_EXCEEDED')
    {
      return res.status(httpStatus.BAD_REQUEST).send({"message":"Account number already deposited  or withdrawed 3 times in a day"});

    }
    else if(posttransfertodb==='ACCOUNT_NUMBER_ISSUE')
    {
        return res.status(httpStatus.BAD_REQUEST).send({"message":"Invalid account number"});
    }
    else if(posttransfertodb==='AMOUNT_ISSUE')
    {
        return res.status(httpStatus.BAD_REQUEST).send({"message":"Transfer more than 1000 and less than 25000"});
    }
    else if(posttransfertodb==='AMOUNT_NEGATIVE')
    {
      return res.status(httpStatus.BAD_REQUEST).send({"message":"Account balance is insufficient so not possible"});
    }
    else if(posttransfertodb==="ACCOUNT_NUMBER_ARE_SAME"){
      return res.status(httpStatus.BAD_REQUEST).send({"message":"Account from and account to can't be same"});
    }
    else if(posttransfertodb==="SUCCESS")
    {
        return res.status(httpStatus.CREATED).send({"message":"successful"});
    }
    else
    {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({"message":"Internal service error"});
    }
  
};

  
module.exports = {
    postDeposit,
    postWithdraw,
    postTransfer
};