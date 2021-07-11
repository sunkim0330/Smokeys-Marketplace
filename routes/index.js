/**
 * Importing database schemas from ./database/index.js
 */
const { Users, Items, Transactions } = require('../database');
const { Types } = require('mongoose');

const getTransactions = async (req, res) => {

  let user = req.query.user_id;
  let count = Number(req.query.count) || 5;
  let page = Number(req.query.page) || 0;
  let sort = { updatedAt : -1 };

  const response = {
    user : user,
    page : page,
    count : count,
    results : [],
  }
  let fetchTransactions = await Transactions.find({ $or : [
    { 'from.user_id' : new Types.ObjectId(req.query.user_id) },
    { 'to.user_id' : new Types.ObjectId(req.query.user_id) }
  ] })
    .limit(count)
    .skip(page * count)
    .sort(sort)


  response.results = fetchTransactions;

  res.status(200).send(response);

}

const addTransaction = async (req, res) => {

  console.log(req.query)
  const newTransaction = new Transactions({
    from : {
      user_id : new Types.ObjectId(req.query.from_user_id),
      item_id : new Types.ObjectId(req.query.from_item_id),
    },
    to : {
      user_id : new Types.ObjectId(req.query.to_user_id),
      item_id : new Types.ObjectId(req.query.to_item_id),
    }
  })

  newTransaction.save()
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(422))

}

module.exports = {
  getTransactions,
  addTransaction
}

/*
const getUserInfo, GET
-- find and get Users by _id (ex: Users.find({...}))
-- can retrieve username, email, location, phone num, ratings_reviews, and transactions

const getItems, GET
-- find and get Item by owner (_id)
-- can retrieve owner, name, type, availability, description, image_link, time_span

const getTransaction, GET
-- find and get Transaction user1 or user2 user_id
-- can retrieve a specific item what user1 or user2 is trading
-- user_id and item are nested inside of user1 and user2

const saveNewUser, POST
-- save new Users Schema

const saveItem, POST
-- save new Item Schema

const saveTransaction, POST
-- save new Transaction Schema
Test query to update transactions array on user --
let test = await Transactions.find({status:'pending', 'from.user_id': new mongoose.Types.ObjectId("60eac1d6a0e0293f05e414cf")})

let update = await Users.updateOne({_id: new mongoose.Types.ObjectId("60eac1d6a0e0293f05e414cf")}, {
  $push: {
    transactions: test[0]
  }
})

const updateReview, PUT
-- upsert(update or insert) or findOneAndUpdate rating_reviews in Users

const confirmTransaction, PUT
const cancelTransaction, PUT
Test query to update data on transaction:
db.transactions.update({_id:ObjectId("60ead757d22b214406d4c741")}, {$set: {status:"completed"}})
*/
