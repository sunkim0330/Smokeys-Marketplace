/**
 * @dev Importing database schemas from ./database/index.js
 */
const { Users, Items, Transactions, RatingsReviews } = require('../database');
const { Types } = require('mongoose');

/**
 @dev This function will GET and return all ratings and reviews in a paginated format.
 @param { page } req.query Selects the page of results to return. default 0.
 @param { count } req.query specifies how many results per page to return. default 5.
 @param { user_id } req.params specifies the currently logged in user
 @param {*} res On successful GET a 200 status code will be sent
 */

const getReviews = async (req, res) => {
  let user = req.params.user_id;
  let count = Number(req.query.count) || 5;
  let page = Number(req.query.page) || 0;
  const response = {
    user: user,
    results: []
  }

  let fetchRatingsReviews = await RatingsReviews.find({reviewed_id : new Types.ObjectId(user)})
    .limit(count)
    .skip(page * count)
    response.results = fetchRatingsReviews;

    res.send(response)
}

/**
 *  @dev This function will GET the size of a collection for a given user
 * @param { user_id } req.params specifies the currently logged in user
 * @param {size} req returns the size of the ratings&reviews collection for a specific user
 */

const getReviewSize = async (req, res) => {
  let user = req.params.user_id;
  let length = await RatingsReviews.find({reviewed_id : new Types.ObjectId(user)}).countDocuments()
  const response = {size : length}

  res.send(response)
}

/**
 @dev This function will POST a new rating and review for a specific transaction
 @param { reviewer_id } req  reviewer_id is the ID for the user initiating the review
 @param { reviewed_id } req reviewed_id is the ID for the user the review is being left for
 @param { transaction_id } req transaction_id is the ID for the transaction between the reviewer and the reviewed
 @param { rating } req rating is the value (1-5) the reviewer left for a reviewed user
 @param { review } req review is the text the reviewer left for a reviewed user
 */

const addReview = async (req, res) => {
  const newReview = new RatingsReviews({
    reviewed_id : req.body.reviewer_id,
    reviewer_id : req.body.reviewed_id,
    transaction_id : req.body.transaction_id,
    rating: req.body.rating,
    review: req.body.review
  })

  newReview.save()
    .then(() => res.send(newReview))
    .catch(() => res.sendStatus(422))

}

module.exports = {
  getReviews,
  addReview,
  getReviewSize
}