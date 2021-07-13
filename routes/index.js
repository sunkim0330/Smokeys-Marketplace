const {
  getTransactions,
  addTransaction,
  completeTransaction,
  cancelTransaction } = require("./transactions.js");

  const {
    getReviews,
    addReview
  } = require("./reviews.js")

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
  ratingsReviews: {
    getReviews,
    addReview
  },
  users: {
    getUserInfo,
    createNewUser,
    updateUserInfo
  }
}