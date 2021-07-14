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

    res.status(200).send(response);
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
    reviewed_id : req.body.reviewer,
    reviewer_id : req.body.reviewed,
    transaction_id : req.body.transaction,
    rating: req.body.rating,
    review: req.body.review
  })

  newReview.save()
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(422))

}

module.exports = {
  getReviews,
  addReview
}

// example ratingreview:

// {
//   "user": "60eac1d6a0e0293f05e414cf",
//   "results": [
//       {
//           "_id": "60ecb573986d0c1dc917e16b",
//           "reviewed_id": "60eac1d6a0e0293f05e414cf",
//           "reviewer_id": "60eac1d6a0e0293f05e414d0",
//           "transaction_id": "60ead757d22b214406d4c741",
//           "ratings": 5,
//           "reviews": "This is testing data!",
//           "createdAt": "2021-07-12T21:34:43.626Z",
//           "updatedAt": "2021-07-12T21:34:43.626Z",
//           "__v": 0
//       },
//       {
//           "_id": "60ecbdf7383f8322946916a9",
//           "reviewed_id": "60eac1d6a0e0293f05e414cf",
//           "reviewer_id": "60eac1d6a0e0293f05e414d0",
//           "transaction_id": "60ead757d22b214406d4c741",
//           "ratings": 5,
//           "reviews": "This more data!!!",
//           "createdAt": "2021-07-12T22:11:03.216Z",
//           "updatedAt": "2021-07-12T22:11:03.216Z",
//           "__v": 0
//       },
//       {
//           "_id": "60ecbe01383f8322946916ab",
//           "reviewed_id": "60eac1d6a0e0293f05e414cf",
//           "reviewer_id": "60eac1d6a0e0293f05e414d0",
//           "transaction_id": "60ead757d22b214406d4c741",
//           "ratings": 1,
//           "reviews": "Mwahahahah!!!",
//           "createdAt": "2021-07-12T22:11:13.421Z",
//           "updatedAt": "2021-07-12T22:11:13.421Z",
//           "__v": 0
//       },
//       {
//           "_id": "60ecbe0d383f8322946916ad",
//           "reviewed_id": "60eac1d6a0e0293f05e414cf",
//           "reviewer_id": "60eac1d6a0e0293f05e414d0",
//           "transaction_id": "60ead757d22b214406d4c741",
//           "ratings": 3,
//           "reviews": "Moo",
//           "createdAt": "2021-07-12T22:11:25.839Z",
//           "updatedAt": "2021-07-12T22:11:25.839Z",
//           "__v": 0
//       },
//       {
//           "_id": "60ecbe20383f8322946916b0",
//           "reviewed_id": "60eac1d6a0e0293f05e414cf",
//           "reviewer_id": "60eac1d6a0e0293f05e414d0",
//           "transaction_id": "60ead757d22b214406d4c741",
//           "ratings": 4,
//           "reviews": "Meow",
//           "createdAt": "2021-07-12T22:11:44.591Z",
//           "updatedAt": "2021-07-12T22:11:44.591Z",
//           "__v": 0
//       }
//   ]
// }