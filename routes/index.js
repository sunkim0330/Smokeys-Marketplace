const {
  getTransactions,
  addTransaction,
  completeTransaction,
  cancelTransaction } = require("./transactions.js");

  const {
    getReviews,
    addReview
  } = require("./reviews.js")

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
  }
}