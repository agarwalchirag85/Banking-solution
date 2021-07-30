const { Transaction } = require("../model");

/*
This function is used to find the number of transaction that has been performed by an account 
*/

const nooftrnsationperday = async(details)=>{

    let recodedate=new Date();
    let startdate=new Date(recodedate.getFullYear(),recodedate.getMonth(),recodedate.getDate());
    let data1=0,data2=0;
    if(details.route.path==='/deposit' || details.route.path === '/transfer')
    {
        let accountnumber = details.body.accountno || details.body.accountto;
        try{
            data1 = await Transaction.countDocuments({accountto:accountnumber,
                transferdate: {
                        $lte: recodedate,
                        $gte: startdate,
                    },
            });
        }
        catch(e)
        {
            return null;
        }
    }
    if(details.route.path==='/withdraw' || details.route.path === '/transfer')
    {
        let accountnumber = details.body.accountno || details.body.accountfrom;
        
        try{
            data2 = await Transaction.countDocuments({accountfrom:accountnumber,
                transferdate: {
                        $lte: recodedate,
                        $gte: startdate,
                    },
            });
        }
        catch(e){
            return null;
        }
    }
    return {deposit:data1,withdraw:data2};
}

module.exports={
    nooftrnsationperday 
}