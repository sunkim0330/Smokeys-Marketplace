const url = require('url');
/**
 * Importing database schemas from ./database/index.js
 */
const { Users, Items, Transactions } = require('../database');
const { Types } = require('mongoose');

/**
 * @dev This function will GET and return all transactions associated with the given user_id
 * @param {user_id} req user_id is the user from which you want to retrieve transaction data for
 * @param {*} res On successful GET a 200 status code will be sent
 */
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

/**
 * @dev This function will add a new transaction to the database
 * @param {from_user_id} req from_user_id is the ID for the user initiating the transaction
 * @param {from_item_id} req from_item_id is the ID for the item that from_user_id is offering
 * @param {to_user_id} req to_user_id is the ID for the user that from_user_id is initiating the transaction with
 * @param {to_item_id} req to_item_id is the ID for the item that to_user_id is offering in the transaction
 * @param {*} res on successful POST a 201 status code will be sent. On error a 422 code will be sent
 */
const addTransaction = async (req, res) => {

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

/**
 * @dev This function will mark the given transactiion_id a "complete"
 * @param {transaction_id} req this is the ID for the transaction that will be marked "complete"
 * @param {*} res on successful update a status code of 204 will be returned. On error code 422 will be sent
 */
const completeTransaction = async (req, res) => {

  let trxID = req.url.split('/')[2]

  Transactions.updateOne({ _id: new Types.ObjectId(trxID) },
  { $set :
    { status : "completed" }
  })
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(422))

}

/**
 * @dev This function will mark the given transactiion_id a "cancelled"
 * @param {transaction_id} req this is the ID for the transaction that will be marked "cancelled"
 * @param {*} res on successful update a status code of 204 will be returned. On error code 422 will be sent
 */
const cancelTransaction = async (req, res) => {

  let trxID = req.url.split('/')[2]

  Transactions.updateOne({ _id: new Types.ObjectId(trxID) },
  { $set :
    { status : "cancelled" }
  })
    .then(() => res.sendStatus(204))
    .catch(() => res.sendStatus(422))

}

module.exports = {
  getTransactions,
  addTransaction,
  completeTransaction,
  cancelTransaction
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
