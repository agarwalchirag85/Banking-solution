const depositInput = (accountnumber,amount)=>{

    let deposit={
        accountno:accountnumber,
        amount:amount
    }

    return deposit;
}

const withdrawInput = (accountnumber,amount)=>{

    let withdraw={
        accountno:accountnumber,
        amount:amount
    }

    return withdraw;
}

const transferInput = (accountnumberfrom,accountnumberto,amount)=>{

    let transfer={
        accountto:accountnumberto,
        accountfrom:accountnumberfrom,
        amount:amount
    }

    return transfer;
}

module.exports = {
    depositInput,
    withdrawInput,
    transferInput
  };