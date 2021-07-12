const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Users, Item, Transaction } = require("../database");

mongoose.connect("mongodb://localhost/smokeys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message));
db.on("open", () => console.log(`Connected to Smokey's DB`));

let port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/../dist"));

// app.route(/* ... */);
//   //.get()
//   //.post()
//   //...

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
