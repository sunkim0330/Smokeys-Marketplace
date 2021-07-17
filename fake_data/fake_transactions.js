const faker = require('faker');
const { Users, Items, Transactions } = require('../database');
const mongoose = require("mongoose");

/**
 * @dev sets mongodb data to a test DB when npm test is run to preserve production/dev DB
 */
 const dbLocation = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/test_smokeys' : 'mongodb://localhost/smokeys';

mongoose.connect(dbLocation, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const newTrx = async (_userId1, _itemId1, _userId2, _itemId2) => {

  let newTrx = new Transactions({
    from: {
      user_id: _userId1,
      item_id: _itemId1
    },
    to: {
      user_id: _userId2,
      item_id: _itemId2
    },
    status: 'pending'
  })

  let saveTrx = await newTrx.save();
}


const db = mongoose.connection;
db.on("error", (err) => console.log(err.message));
db.on("open", async () => {
  console.log(`Connected to Smokey's DB to add test Item data`)

  let userIds = [];
  let itemIds = [];

  let allUsers = await Users.find();
  let allItems = await Items.find();

  allUsers.forEach(user => userIds.push(user._id));
  allItems.forEach(item => itemIds.push(item._id));


  for (let i = 0; i < 20; i++) {

    let userId1 = userIds[Math.floor(Math.random() * userIds.length)];
    let userId2 = userIds[Math.floor(Math.random() * userIds.length)];

    if (userId1 === userId2) {
      while (userId1 === userId2) {
        userId2 = userIds[Math.floor(Math.random() * userIds.length)];
      }
    }

    let itemId1 = itemIds[Math.floor(Math.random() * itemIds.length)];
    let itemId2 = itemIds[Math.floor(Math.random() * itemIds.length)];

    if (itemId1 === itemId2) {
      while (itemId1 === itemId2) {
        itemId2 = itemIds[Math.floor(Math.random() * itemIds.length)];
      }
    }

    newTrx(userId1, itemId1, userId2, itemId2)
  }

  console.log(`Finished adding 20 fake items to Smokey's DB`);
});

module.exports = newTrx;