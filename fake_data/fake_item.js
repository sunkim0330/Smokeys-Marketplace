const faker = require('faker');
const { Users, Items } = require('../database');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/smokeys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const newItem = async (_id) => {

  let newItem = new Items({
    owner: _id,
    name: faker.commerce.productName(),
    type: 'goods',
    availability: true,
    description: faker.commerce.productDescription(),
    image_link: faker.image.imageUrl()
  })

  let saveItem = await newItem.save();
}


const db = mongoose.connection;
db.on("error", (err) => console.log(err.message));
db.on("open", async () => {
  console.log(`Connected to Smokey's DB to add test Item data`)

  let userIds = [];
  let allUsers = await Users.find();

  allUsers.forEach(user => userIds.push(user._id));

  for (let i = 0; i < 20; i++) {
    newItem(userIds[Math.floor(Math.random() * userIds.length)])
  }

  console.log(`Finished adding 20 fake items to Smokey's DB`);
});
