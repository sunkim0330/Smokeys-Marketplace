const { Users, Items, Transactions, RatingsReviews } = require('../database');
const { Types } = require('mongoose');

const getReviews = async (req, res) => {
  let user = req.query.user_id;
  let count = Number(req.query.count) || 5;
  let page = Number(req.query.page) || 0;

  const response = {
    ratings: ratings,
    reviews: reviews,
    results: []
  }

  let fetchRatingsReviews = await RatingsReviews.find({_id: user})
    .limit(count)
    .skip(page * count)
  console.log(fetchRatingsReviews);
    response.results = fetchRatingsReviews;

    res.status(200).send(response);
}

const addReview = async (req, res) => {
  console.log(req.body);
  const newReview = new RatingsReviews({
    reviewed_id : req.body.reviewer,
    reviewer_id : req.body.reviewed,
    transaction_id : req.body.transaction,
    ratings: req.body.rating,
    reviews: req.body.review
  })

  newReview.save()
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(422))

}

module.exports = {
  getReviews,
  addReview
}