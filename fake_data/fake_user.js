const faker = require('faker');
const { Users } = require('../database');
const mongoose = require("mongoose");
const fakeZips = ["08723", "08701", "08742", "08724", "08730", "08736", "08750", "08720"]

mongoose.connect("mongodb://localhost/smokeys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const addNewUser = async () => {

  let newUser = new Users({
    firstName : faker.name.firstName(),
    lastName : faker.name.lastName(),
    email : faker.internet.email(),
    location : fakeZips[Math.floor(Math.random()*fakeZips.length)],
    phone : faker.phone.phoneNumberFormat()
  })

  let saved = await newUser.save();
}

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message));
db.on("open", () => {
  console.log(`Connected to Smokey's DB to add test User data`)

  for (let i = 0; i < 20; i++) {
    addNewUser()
  }

  console.log(`Finished adding 20 new users to Smokey's DB`);
});


