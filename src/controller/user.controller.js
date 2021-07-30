const httpStatus = require("http-status");
const { userService } = require("../service");

//make request to create new user to service 
const postUser = async (req, res,next) => {
  
    const postusertodb= await userService.postUserService(req.body);
  
    if(postusertodb==="USERTAKEN")
    {
      return res.status(httpStatus.BAD_REQUEST).send({"message":"Account name alredy taken please select another name and try again"});
    }
    else if(postusertodb==="USER_NAME_LENGTH")
    {
      return res.status(httpStatus.BAD_REQUEST).send({"message":"User Name should be of valid length"});
    }
    else if(postusertodb.accountno)
    {
      return res.status(httpStatus.CREATED).send({"account number" : postusertodb.accountno});
    }
    else
    {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({"message":"Internal service error"});
    }

  
  };
  
module.exports = {
    postUser,
};