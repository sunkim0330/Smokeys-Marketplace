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

const {
  getItems,
  getUserItems,
  addItem,
  updateAvailability } = require("./items.js")

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
  },
  items: {
    getItems,
    getUserItems,
    addItem,
    updateAvailability
}
}