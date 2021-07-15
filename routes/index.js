const {
  getTransactions,
  addTransaction,
  completeTransaction,
  cancelTransaction,
  getUserTransactions } = require("./transactions.js");

  const {
    getReviews,
    addReview,
    getReviewSize
  } = require("./reviews.js")

const {
  getUserInfo,
  createNewUser,
  updateUserInfo } = require("./users.js");

const {
    getItems,
    getUserItems,
    addItem,
    updateAvailability
} = require("./items.js")

module.exports = {
  transactions: {
    getTransactions,
    addTransaction,
    completeTransaction,
    cancelTransaction,
    getUserTransactions
  },
  ratingsReviews: {
    getReviews,
    addReview,
    getReviewSize
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