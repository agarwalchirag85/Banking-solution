const express = require("express");
const userRoute = require("./user.router");
const transactionRouter = require('./transaction.router');

const router = express.Router();

router.use("/create",userRoute);
router.use("/transation",transactionRouter);

module.exports = router;