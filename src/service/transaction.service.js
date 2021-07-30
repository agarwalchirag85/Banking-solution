const { Transaction } = require("../model");
const { User } = require("../model");
const {nooftrnsationperday} =require("./helper.service");
const { Min_Deposit_Amount,
    Max_Deposit_Amount,
    Min_Withdrawal_Amount,
    Max_Withdrawal_Amount,
    Min_Transfer_Amount,
    Max_Transfer_Amount,
    No_of_Transaction,
    Min_Account_Balance,
    Max_Account_Balance}= require("../uitils/apiCommonConstant");


// handles deposit the amount to account  
const postDepositService = async(details)=>{
    
    if(details.body.amount>=Min_Deposit_Amount && details.body.amount<=Max_Deposit_Amount)
    {
        try{
            const userdata = await User.find({"accountno":details.body.accountno});
            if(userdata.length>0)
            {
                    if(userdata[0].balance+details.body.amount<=Max_Account_Balance){
                        const nooftransation = await nooftrnsationperday(details);
                        if(nooftransation.deposit<No_of_Transaction){
                            const tranactiondata= await Transaction.create({
                                accountto:details.body.accountno,
                                transferdate:new Date(),
                                transfertype:"Deposit",
                            });
                            
                            userdata[0].balance =  details.body.amount + userdata[0].balance;
                            return userdata[0].save();
                        }
                        else
                        {
                            return "NUM_OF_TRANSACTIONS_EXCEEDED";
                        }
                    }
                    else
                    {
                        return "AMOUNT_EXCEEDED_1LAKH";
                    }
            }
            else
            {
                return "ACCOUNT_NUMBER_ISSUE";
            }
        }
        catch(e)
        {
            return null;
        }
    }
    else
    {
        return "AMOUNT_ISSUE"
    }
    
    return null;
}


// handles withdraw the amount to account 
const postWithdrawService = async(details)=>{
    
    if(details.body.amount>=Min_Withdrawal_Amount && details.body.amount<=Max_Withdrawal_Amount)
    {
        try{
            const userdata = await User.find({"accountno":details.body.accountno});
            if(userdata.length>0)
            {
                    if(userdata[0].balance-details.body.amount>=Min_Account_Balance){
                        const nooftransation = await nooftrnsationperday(details);
                        if(nooftransation.withdraw<No_of_Transaction){
                            const tranactiondata= await Transaction.create({ 
                                accountfrom:details.body.accountno,
                                transferdate:new Date(),
                                transfertype:"Withdraw",
                            });
                            
                            userdata[0].balance = userdata[0].balance-details.body.amount;
                            return userdata[0].save();
                        }
                        else
                        {
                            return "NUM_OF_TRANSACTIONS_EXCEEDED";
                        }
                    }
                    else
                    {
                        return "AMOUNT_NEGATIVE";
                    }
            }
            else
            {
                return "ACCOUNT_NUMBER_ISSUE";
            }
        }
        catch(e)
        {
            return null;
        }
    }
    else
    {
        return "AMOUNT_ISSUE"
    }
    
    return null;
}


// handles transfer of amount from one account to other 
const postTransferService = async(details) =>{

    if(details.body.amount>=Min_Transfer_Amount && details.body.amount<=Max_Transfer_Amount)
    {
        if(details.body.accountfrom===details.body.accountto)
        {
            return "ACCOUNT_NUMBER_ARE_SAME";
        }
        try{
            const userdatafrom = await User.find({"accountno":details.body.accountfrom});
            const userdatato = await User.find({"accountno":details.body.accountto});
            if(userdatato.length>0 && userdatafrom.length>0)
            {
                    if(userdatafrom[0].balance-details.body.amount>=Min_Account_Balance
                        && userdatato[0].balance+details.body.amount<=Max_Account_Balance){

                            const nooftransation = await nooftrnsationperday(details);
                        if(nooftransation.deposit<No_of_Transaction && nooftransation.withdraw<No_of_Transaction){
                            const tranactiondata= await Transaction.create({accountfrom:details.body.accountfrom,
                                accountto:details.body.accountto,
                                transferdate:new Date(),
                                transfertype:"Transfer",
                            });
                            
                            userdatafrom[0].balance = userdatafrom[0].balance-details.body.amount;
                            userdatato[0].balance = userdatato[0].balance+details.body.amount;
                            await userdatafrom[0].save();
                            await userdatato[0].save();
                            return "SUCCESS";
                        }
                        else
                        {
                            return "NUM_OF_TRANSACTIONS_EXCEEDED";
                        }
                    }
                    else
                    {
                        return "AMOUNT_NEGATIVE";
                    }
            }
            else
            {
                return "ACCOUNT_NUMBER_ISSUE";
            }
        }
        catch(e)
        {
            return null;
        }
    }
    else
    {
        return "AMOUNT_ISSUE"
    }
    
    return null;

}

module.exports = {
    postDepositService,
    postWithdrawService,
    postTransferService
};