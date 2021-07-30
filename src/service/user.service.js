const { User } = require("../model");

const getUserName = async(user)=>{
    
    const data=await User.find({name: user.name}).exec();
    return data ;
}

//Handles account creation
const postUserService = async(user)=>{

    if(user.name.length>0)
    {
        try{
            let ispossiblename = await getUserName(user);

            let min = 1000;
            let max = 9999;

            let accountnumber =  Math.floor(Math.random() * (max - min + 1)) + min ;
            
            if(ispossiblename===undefined || ispossiblename.length===0){
            const data= await User.create({name:user.name,
                                        balance:0,  
                                        accountno:accountnumber,
                                        });
                                        
                                        return data;
            }
            else
            {
                return "USERTAKEN";
            }
        }
        catch(e)
        {
            return null;
        }
    }
    else
        {
            return "USER_NAME_LENGTH";
        }
  }

module.exports = {
    postUserService,
    getUserName
  };