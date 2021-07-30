//declaring constants here
const Min_Deposit_Amount = 500;
const Max_Deposit_Amount = 50000;

const Min_Withdrawal_Amount = 1000;
const Max_Withdrawal_Amount = 25000;

const Min_Transfer_Amount = Min_Withdrawal_Amount;
const Max_Transfer_Amount = Max_Withdrawal_Amount;

const No_of_Transaction=3;
const Min_Account_Balance=0;
const Max_Account_Balance=100000;

module.exports = { Min_Deposit_Amount,
                   Max_Deposit_Amount,
                   Min_Withdrawal_Amount,
                   Max_Withdrawal_Amount,
                   Min_Transfer_Amount,
                   Max_Transfer_Amount,
                   No_of_Transaction,
                   Min_Account_Balance,
                   Max_Account_Balance};