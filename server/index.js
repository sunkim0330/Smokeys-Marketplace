const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./passport.js');
const { Users, Item, Transaction } = require("../database");
const {
  ratingsReviews,
  transactions,
  items,
  users,
  ratingsReviews } = require("../routes");

mongoose.connect("mongodb://localhost/smokeys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", (err) => console.log(err.message));
db.on("open", () => console.log(`Connected to Smokey's DB`));

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

let port = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/../dist"));
app.use(cors());

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieSession({
  name: 'smokeys-session',
  keys: ['key1', 'key2']
}))

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

app.route('/user/')
  .post(users.createNewUser)

app.route('/user/:id')
  .get(users.getUserInfo)
  .put(users.updateUserInfo)

app.route('/items/')
  .get(items.getItems)

app.route('/items/:user_object_id')
  .get(items.getUserItems)
  .post(items.addItem)

app.route('/items/:user_object_id')
  .put(items.updateAvailability)

app
  .route("/transactions/")
  .get(transactions.getTransactions)
  .post(transactions.addTransaction);

app
  .route("/transactions/:transaction_id/complete")
  .put(transactions.completeTransaction);

app
  .route("/transactions/:transaction_id/cancel")
  .put(transactions.cancelTransaction);

app.route("/reviews/:user_id")
  .get(ratingsReviews.getReviews)
  .post(ratingsReviews.addReview);

// Route to send client when user is not recognized in DB
app.get('/failed', (req, res) => res.send('You Failed to log in!'))
//Route to send client when user is found in the DB
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    req.user.isUser ? res.redirect('/marketplace') : res.redirect('/signup')

  }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
})

// This needs to be last route!
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});