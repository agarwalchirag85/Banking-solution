const express = require("express");
const router = express.Router();
const userController = require("../../controller/user.controller");

//Post user creation request to controller
router.post("/", async (req, res, next) => {  
    await userController.postUser(req,res,next) ;
  });


module.exports = router;