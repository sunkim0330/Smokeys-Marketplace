const {
  getTransactions,
  addTransaction,
  completeTransaction,
  cancelTransaction } = require("./transactions.js");

const {
  getUserInfo,
  createNewUser,
  updateUserInfo } = require("./users.js");

module.exports = {
  transactions: {
    getTransactions,
    addTransaction,
    completeTransaction,
    cancelTransaction
  },
  users: {
    getUserInfo,
    createNewUser,
    updateUserInfo
  }
}