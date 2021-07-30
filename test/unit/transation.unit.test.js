const request = require("supertest");
const httpStatus = require("http-status");
const { userService } = require("../../src/service");
const app = require("../../src/app");
const setupTestDB = require("../utils/db-handler");
const { depositInput,
        withdrawInput,
        transferInput } = require("../fixtures/transaction.fixture");

setupTestDB(); 

describe("Transaction test", () => {
  describe("Deposit",() =>{
    it("should return error message if deposit amount is less than 500 and can't be more than 50000" , async() =>{

        let  newUser = {
            name: "testingname",
          };
        const res1 = await userService.postUserService(newUser);
        expect.objectContaining({
              "account number": expect.any(Number) ,
              "__v": 0,
              "_id": expect.anything(),
              "name":res1.name});
        
        let depositinput1=depositInput(res1.accountno,499);
        let depositinput2=depositInput(res1.accountno,50001);
      
        const res2 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(res2.status).toEqual(httpStatus.BAD_REQUEST);
        expect.objectContaining({message:"Deposite more than 500 and less than 50000"});

        const res3 = await request(app).post(`/v1/transation/deposit`).send(depositinput2);
        expect(res3.status).toEqual(httpStatus.BAD_REQUEST);
        expect.objectContaining({message:"Deposite more than 500 and less than 50000"});
        
    });

    it("should return error message if invalid Account number is passed",async()=>{

        let depositinput1=depositInput(5000,500);
        const res2 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(res2.status).toEqual(httpStatus.BAD_REQUEST);
        expect.objectContaining({message:"Invalid account Number"});
    });

    it("should return error message if Account number already deposited 3 times in a day",async()=>{

        let  newUser = {
            name: "testingname",
        };
        const res1 = await userService.postUserService(newUser);

        let depositinput1=depositInput(res1.accountno,500);
           
        const res2 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(res2.status).toEqual(httpStatus.CREATED);

        const res3 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(res3.status).toEqual(httpStatus.CREATED);

        const res4 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(res4.status).toEqual(httpStatus.CREATED);

        const res5 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(res5.status).toEqual(httpStatus.BAD_REQUEST);

        expect.objectContaining({message:"Account number alredy deposited 3 times in a day"});
    });
    
    it("should return error message if Depositing amount makes the balance exceed 100000",async()=>{
        let  newUser = {
            name: "testingname",
        };
        const res1 = await userService.postUserService(newUser);
        let depositinput1=depositInput(res1.accountno,50000);
        let depositinput2=depositInput(res1.accountno,500);
        const res2 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(res2.status).toEqual(httpStatus.CREATED);

        const res3 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(res3.status).toEqual(httpStatus.CREATED);

        const res4 = await request(app).post(`/v1/transation/deposit`).send(depositinput2);
        expect(res4.status).toEqual(httpStatus.BAD_REQUEST);

    })
  });

  describe("withdraw",() =>{
    it("should return error message if Withdraw amount is less than 1000 and more than 25000" , async() =>{

        let  newUser = {
            name: "testingname",
          };
        const res1 = await userService.postUserService(newUser);
        expect.objectContaining({
              "account number": expect.any(Number) ,
              "__v": 0,
              "_id": expect.anything(),
              "name":res1.name});

        let withdrawinput1=withdrawInput(res1.accountno,999);
        let withdarwinput2=withdrawInput(res1.accountno,25001);
        
        const res2 = await request(app).post(`/v1/transation/withdraw`).send(withdrawinput1);
        expect(res2.status).toEqual(httpStatus.BAD_REQUEST);
        expect.objectContaining({message:"Deposite more than 1000 and less than 25000"});

        const res3 = await request(app).post(`/v1/transation/withdraw`).send(withdarwinput2);
        expect(res3.status).toEqual(httpStatus.BAD_REQUEST);
        expect.objectContaining({message:"Deposite more than 1000 and less than 25000"});
        
    });

    it("should return error message if invalid Account number is passed",async()=>{

        let withdrawinput1=withdrawInput(5000,500);
        const res2 = await request(app).post(`/v1/transation/withdraw`).send(withdrawinput1);
        expect(res2.status).toEqual(httpStatus.BAD_REQUEST);
        expect.objectContaining({message:"Invalid account Number"});

    });

    it("should return error message if Account number alredy withdraw 3 times in a day",async()=>{

        let  newUser = {
            name: "testingname",
        };
        const res1 = await userService.postUserService(newUser);

        let withdrawinput1=withdrawInput(res1.accountno,1000);
        let depositinput1=depositInput(res1.accountno,5000);

        const deposit = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(deposit.status).toEqual(httpStatus.CREATED);

        const res2 = await request(app).post(`/v1/transation/withdraw`).send(withdrawinput1);
        expect(res2.status).toEqual(httpStatus.CREATED);

        const res3 = await request(app).post(`/v1/transation/withdraw`).send(withdrawinput1);
        expect(res3.status).toEqual(httpStatus.CREATED);

        const res4 = await request(app).post(`/v1/transation/withdraw`).send(withdrawinput1);
        expect(res4.status).toEqual(httpStatus.CREATED);

        const res5 = await request(app).post(`/v1/transation/withdraw`).send(withdrawinput1);
        expect(res5.status).toEqual(httpStatus.BAD_REQUEST);

        expect.objectContaining({message:"Account number alredy withdraw 3 times in a day"});
    });

    it("should return error message if Withdrawing amount makes the balance less than 0",async()=>{

        let  newUser = {
            name: "testingname",
        };
        const res1 = await userService.postUserService(newUser);
      
        let withdrawinput1=withdrawInput(res1.accountno,1000);
        let depositinput1=depositInput(res1.accountno,1000);

        const deposit = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(deposit.status).toEqual(httpStatus.CREATED);

        const res2 = await request(app).post(`/v1/transation/withdraw`).send(withdrawinput1);
        expect(res2.status).toEqual(httpStatus.CREATED);

        const res3 = await request(app).post(`/v1/transation/withdraw`).send(withdrawinput1);
        expect(res3.status).toEqual(httpStatus.BAD_REQUEST);
    });  
  });

  describe("Transfer",() =>{

    it("should return error message if transfer amount is less tham 1000 and more than 25000",async()=>{

        let  newUser1 = {
            name: "testingname1",
          };

        let  newUser2 = {
            name: "testingname2",
          };

        const res1 = await userService.postUserService(newUser1);
        expect.objectContaining({
                "account number": expect.any(Number),
                "__v": 0,
                "_id": expect.anything(),
                "name":res1.name});

        const res2 = await userService.postUserService(newUser2);
        expect.objectContaining({
                "account number": expect.any(Number),
                "__v": 0,
                "_id": expect.anything(),
                "name":res2.name});

        let transferinput1=transferInput(res1.accountno,res2.accountno,999);
        let transferinput2=transferInput(res1.accountno,res2.accountno,25001);

        const res3 = await request(app).post(`/v1/transation/transfer`).send(transferinput1);
        expect(res3.status).toEqual(httpStatus.BAD_REQUEST);

        const res4 = await request(app).post(`/v1/transation/transfer`).send(transferinput2);
        expect(res4.status).toEqual(httpStatus.BAD_REQUEST);   
    });

    it("should return error message if Account from and account to are same",async()=>{

        let  newUser1 = {
            name: "testingname1",
          };

        const res1 = await userService.postUserService(newUser1);
        expect.objectContaining({
                "account number": expect.any(Number),
                "__v": 0,
                "_id": expect.anything(),
                "name":res1.name});

        let transferinput1=transferInput(res1.accountno,res1.accountno,999);
        const res3 = await request(app).post(`/v1/transation/transfer`).send(transferinput1);
        expect(res3.status).toEqual(httpStatus.BAD_REQUEST);

    });

    it("should return error message if any of the account number is invalid",async()=>{

        let transferinput1=transferInput(5000,1000,1000);
        const res = await request(app).post(`/v1/transation/transfer`).send(transferinput1);
        expect(res.status).toEqual(httpStatus.BAD_REQUEST);
        expect.objectContaining({message:"Invalid account Number"});
    });

    it("should return successful message if transfer was successful",async()=>{

        let  newUser1 = {
            name: "testingname1",
        };
        let  newUser2 = {
            name: "testingname2",
        };
        const res1 = await userService.postUserService(newUser1);
        const res2 = await userService.postUserService(newUser2);

        let depositinput1=depositInput(res1.accountno,1000);
        const res3 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        expect(res3.status).toEqual(httpStatus.CREATED);

        let transferinput1=transferInput(res1.accountno,res2.accountno,1000);
        
        const res4 = await request(app).post(`/v1/transation/transfer`).send(transferinput1);
        expect(res4.status).toEqual(httpStatus.CREATED);

    });

    it("should return error message if either account from which money is getting transfered or account to which will be receving the money has used 3 deposit or 3 withdraws",async()=>{

        let  newUser1 = {
            name: "testingname1",
        };
        let  newUser2 = {
            name: "testingname2",
        };
        const res1 = await userService.postUserService(newUser1);
        const res2 = await userService.postUserService(newUser2);

        let depositinput1=depositInput(res1.accountno,5000);
        let depositinput2=depositInput(res2.accountno,5000);
        const res3 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        const res4 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        const res5 = await request(app).post(`/v1/transation/deposit`).send(depositinput1);
        const res6 = await request(app).post(`/v1/transation/deposit`).send(depositinput2);
        expect(res3.status).toEqual(httpStatus.CREATED);
        expect(res4.status).toEqual(httpStatus.CREATED);
        expect(res5.status).toEqual(httpStatus.CREATED);
        expect(res6.status).toEqual(httpStatus.CREATED);

        let transferinput1=transferInput(res2.accountno,res1.accountno,1000);
        const res7 = await request(app).post(`/v1/transation/transfer`).send(transferinput1);
        expect(res7.status).toEqual(httpStatus.BAD_REQUEST);


    });

  });
});
