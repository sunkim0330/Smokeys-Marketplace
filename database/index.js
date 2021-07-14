const mongoose = require('mongoose');

/**
 * Schema for each user - Should be called each time we add a new user
 */
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  location: String,
  phone: String
  // ratings_reviews: [mongoose.Schema.Types.Mixed],
  // transactions: [mongoose.Schema.ObjectId]
}, { timestamps: true })

const Users = mongoose.model('Users', UserSchema);

/**
 * Schema for individual items - Should be called each time we add a new item
 */
const ItemSchema = new mongoose.Schema({
  owner: mongoose.Schema.ObjectId,
  name: String,
  type: String,
  availability: Boolean,
  description: String,
  image_link: String
}, { timestamps: true })

const Items = mongoose.model('Items', ItemSchema)

/**
 * Schema for transactions - Should be called each time a new transaction is triggered
 */
const TransactionSchema = new mongoose.Schema({
  from: {
    user_id: mongoose.Schema.ObjectId,
    item_id: mongoose.Schema.ObjectId
  },
  to: {
    user_id: mongoose.Schema.ObjectId,
    item_id: mongoose.Schema.ObjectId
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true })

const Transactions = mongoose.model('Transactions', TransactionSchema);

const RatingsReviewsSchema = new mongoose.Schema({
  reviewer_id: mongoose.Schema.ObjectId,
  reviewed_id: mongoose.Schema.ObjectId,
  transaction_id: mongoose.Schema.ObjectId,
  ratings: Number,
  reviews: String
}, { timestamps: true })

const RatingsReviews = mongoose.model('RatingsReviews', RatingsReviewsSchema);

module.exports = {
  Users,
  Items,
  Transactions,
  RatingsReviews
}

/**
 * @dev The code below will create two new users and add to a local mongoDB upon server start
 * Once server successfully starts kill server and use mongo CLI to iteract with the test data
 */
// let newUser = new Users({
//   username: 'Christian',
//   email: 'ccsailor11@gmail.com',
//   location: 'leverett',
//   phone: 1254236565,
//   ratings_reviews: [],
//   transactions: []
// })

// newUser.save();

// let newUserToo = new Users({
//   username: 'Matt',
//   email: 'Mattatgmail@gmail.com',
//   location: 'Marshfield',
//   phone: 1254236565,
//   ratings_reviews: [],
//   transactions: []
// })

// newUserToo.save();


/**
 * @dev The code below will create two new items and add to a local mongoDB upon server start
 * Once server successfully starts kill server and use mongo CLI to iteract with the test data
 *
 * @dev NOTE : THE OBJECTID HASHES WILL NOT PROPERLY LINE UP WITH YOUR LOCAL DB
 */
// let christianItem = new Items({
//   owner: '60eac1d6a0e0293f05e414cf',
//   name: 'Hammer',
//   type: 'goods',
//   availability: true,
//   description: 'This is a hammer',
//   image_link: 'www.aws.com/asdfkqjhwe'
// })

// christianItem.save();

// let mattItem = new Items({
//   owner: '60eac1d6a0e0293f05e414d0',
//   name: 'Drill',
//   type: 'goods',
//   availability: true,
//   description: 'This is a drill',
//   image_link: 'www.aws.com/asaskqjhwe'
// })

// mattItem.save();

/**
 * @dev The code below will add a test transaction to the transactions collection
 *
 * @dev NOTE : THE OBJECTID HASHES WILL NOT PROPERLY LINE UP WITH YOUR LOCAL DB
 */
// let testTransaction = new Transactions({
//   from: {
//     user_id: '60eac1d6a0e0293f05e414cf',
//     item: '60eac203c6fabc3f28f8d831'
//   },
//   to: {
//     user_id: '60eac1d6a0e0293f05e414d0',
//     item: '60eac203c6fabc3f28f8d832'
//   }
// })

// testTransaction.save();


/**
 * @dev This command will find all usernames that match "Christian"
 * & add a rating/review object to the ratings_reviews field
 */
// db.users.update({
//   user: "Christian"
// },
//   {
//     $push :
//     {
//       ratings_reviews :
//       {
//         rating : 4,
//         review : "testing",
//         left_by : "60eac1d6a0e0293f05e414d0"
//       }
//     }
//   });


/**
 * @dev This command will find all usernames that match "Christian"
 * & add a transaction id to the transactions field array
 */
// db.users.update({
//   username : "Christian"
// },
//   {
//     $push :
//     {
//       transactions : "60ea03a1f5d4fc39d3449d76"
//     }
//   });




/*
User: "60e9ee4fe250d31ac10ff243"
Item: "60e9eee9e250d31ac10ff244"

User: "60e9edb6e250d31ac10ff240"
Item: "60e9ef25e250d31ac10ff245"


TEST AGGREGATION FOR ADDING RATING/REVIEW

db = db.getSiblingDB("smokey_test");
db.getCollection("users").aggregate(
    [
        {
            "$match" : {
                "username" : "ChristianJ"
            }
        },
        {
            "$group" : {
                "_id" : "60e9ee4fe250d31ac10ff243",
                "username" : {
                    "$first" : "$username"
                },
                "email" : {
                    "$first" : "$email"
                },
                "location" : {
                    "$first" : "$location"
                },
                "phone" : {
                    "$first" : "$phone"
                },
                "ratings_reviews" : {
                    "$push" : {
                        "rating" : 3.0,
                        "review" : "this was a good trade"
                    }
                },
                "transactions" : {
                    "$first" : "$transactions"
                }
            }
        }
    ]
);


TEST UPDATE COMMAND TO ADD RATING/REVIEW WITHOUT AGGREGATION
> db.users.update({username: "ChristianJ"}, { $push: { ratings_reviews: {rating:4, review:"testing"} } })

db.COLLECTION.update({
    _id : ID
    },
    { $push : {
    rating: SCORE,
    review: REVIEW
    }
  }
)
*/