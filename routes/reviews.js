const { Users, Items, Transactions, RatingsReviews } = require('../database');
const { Types } = require('mongoose');

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

const addReview = async (req, res) => {
  console.log(req.body);
  const newReview = new RatingsReviews({
    reviewed_id : req.body.reviewed,
    reviewer_id : req.body.reviewer,
    transaction_id : req.body.transaction,
    ratings: req.body.rating,
    reviews: req.body.review
  })

  newReview.save()
    .then((response) => {
      res.status(201).send(response);
      return;
    })
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