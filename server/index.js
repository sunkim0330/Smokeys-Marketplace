const express = require("express");
const app = express();

const path = require("path");
const { Users, Item, Transaction } = require("../database");
const { transactions } = require("../routes");

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

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
// app.route(/* ... */);
//   //.get()
//   //.post()
//   //...

app
  .route("/transactions/")
  .get(transactions.getTransactions)
  .post(transactions.addTransaction);

app
  .route("/transactions/:transaction_id/complete")
  .put(transactions.completeTransaction);

<<<<<<< HEAD
=======
app
  .route("/transactions/:transaction_id/cancel")
  .put(transactions.cancelTransaction);

>>>>>>> 092f6766d3e5c07eebb8c95f19bdf47c472d2b2b
// This needs to be last route!
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
