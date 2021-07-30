const { userService } = require("../../src/service");
const { userOne} = require("../fixtures/user.fixture");
const {User} = require("../../src/model");
const setupTestDB = require("../utils/db-handler");

setupTestDB(); 

describe("User test", () => {
  describe("Post user",() =>{

    it("should return error message if account name is of length 0" , async() =>{

        let username={name:""};
        const res1 = await userService.postUserService(username);

        expect(res1).toEqual("USER_NAME_LENGTH");
      
    });

    it("should only ask for account holder name fields for creation ", async () => {

      const findOneMock = jest.fn();
      const expectedOutput = userOne.name;

      User.findOne = findOneMock.mockReturnValue(expectedOutput);
      const res = await userService.postUserService(userOne);
      expect(res.name).toEqual(expectedOutput);
    });

    it("should return undefined or array of length zero if account name is not present in the database ", async () => {

      const findOneMock = jest.fn();
      const expectedOutput = [];

      User.findOne = findOneMock.mockReturnValue(expectedOutput);
      const res = await userService.getUserName(userOne);
      expect(res).toEqual(expectedOutput);

    });

    it("should return user ACCOUNT NUMBER if success", async () => {

      let  newUser = {
        name: "testingname",
      };

        const res1 = await userService.postUserService(newUser);
        expect.objectContaining({
          "account number": expect.any(Number) ,
          "__v": 0,
          "_id": expect.anything(),
          "name":res1.name,
          });
    });
    
    it("should return error message if user account name is already taken", async () => {

      let  newUser = {
        name: "testingname",
      };

        const res1 = await userService.postUserService(newUser);
        expect.objectContaining({
          "account number": expect.any(Number) ,
          "__v": 0,
          "_id": expect.anything(),
          "name":res1.name,
          });

          const res2 = await userService.postUserService(newUser);
          expect(res2).toEqual("USERTAKEN");
    });
    
  });
});
