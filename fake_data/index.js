const faker = require('faker');
const { Users, Items, Transactions, RatingsReviews } = require('../database');
const fakeZips = ["08723", "08701", "08742", "08724", "08730", "08736", "08750", "08720"]

const addNewUser = async () => {

  let newUser = new Users({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    location: fakeZips[Math.floor(Math.random() * fakeZips.length)],
    phone: faker.phone.phoneNumberFormat()
  })

  let saved = await newUser.save();
  return;
}

const newItem = async () => {
  let randUser = await Users.find()

  let newItem = new Items({
    owner: randUser[Math.floor(Math.random() * randUser.length - 1)]._id,
    name: faker.commerce.productName(),
    type: 'goods',
    availability: true,
    description: faker.commerce.productDescription(),
    image_link: faker.image.imageUrl()
  })

  let saveItem = await newItem.save();
  return;
}

const newTrx = async () => {

  let userIds = [];
  let itemIds = [];

  let allUsers = await Users.find();
  let allItems = await Items.find();

  allUsers.forEach(user => userIds.push(user._id));
  allItems.forEach(item => itemIds.push(item._id));

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
    return;
}


const newRatingReview = async () => {

  let userIds = [];

  let allUsers = await Users.find();

  allUsers.forEach(user => userIds.push(user._id));

  let userId1 = userIds[Math.floor(Math.random() * userIds.length)];
  let userId2 = userIds[Math.floor(Math.random() * userIds.length)];

  if (userId1 === userId2) {
    while (userId1 === userId2) {
      userId2 = userIds[Math.floor(Math.random() * userIds.length)];
    }
  }

  const newReview = new RatingsReviews({
    reviewer_id: _id1,
    reviewed_id: _id2,
    transaction_id: mongoose.Types.ObjectId(),
    ratings: Math.floor(Math.random() * 5),
    reviews: faker.lorem.paragraph()
  });

  let saveReview = await newReview.save();
  return;
}

module.exports = {
  addNewUser,
  newItem,
  newRatingReview,
  newTrx
}