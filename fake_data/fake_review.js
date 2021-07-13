const faker = require('faker');
const { Users, RatingsReviews } = require('../database');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/smokeys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const newRatingReview = async (_id1, _id2) => {

  const newReview = new RatingsReviews({
    reviewer_id: _id1,
    reviewed_id: _id2,
    transaction_id: mongoose.Types.ObjectId(),
    ratings: Math.floor(Math.random() * 5),
    reviews: faker.lorem.paragraph()
  });

  let saveReview = await newReview.save();
}


const db = mongoose.connection;
db.on("error", (err) => console.log(err.message));
db.on("open", async () => {
  console.log(`Connected to Smokey's DB to add test Review data`)

  let userIds = [];

  let allUsers = await Users.find();

  allUsers.forEach(user => userIds.push(user._id));


  for (let i = 0; i < 20; i++) {

    let userId1 = userIds[Math.floor(Math.random() * userIds.length)];
    let userId2 = userIds[Math.floor(Math.random() * userIds.length)];

    if (userId1 === userId2) {
      while (userId1 === userId2) {
        userId2 = userIds[Math.floor(Math.random() * userIds.length)];
      }
    }

    newRatingReview(userId1, userId2)
  }

  console.log(`Finished adding 20 fake reviews to Smokey's DB`);
});
