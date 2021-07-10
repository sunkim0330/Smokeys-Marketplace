const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  location: String,
  phone: Number,
  ratings_reviews: [mongoose.Schema.Types.Mixed],
  transactions: [mongoose.Schema.ObjectId]
}, { timestamps: true })

const Users = mongoose.model('Users', UserSchema);

const ItemSchema = new mongoose.Schema({
  owner: mongoose.Schema.ObjectId,
  name: String,
  type: String,
  availability: Boolean,
  description: String,
  image_link: String
}, { timestamps: true })

const Item = mongoose.model('Item', ItemSchema)

const TransactionSchema = new mongoose.Schema({
  from: {
    user_id: mongoose.Schema.ObjectId,
    item: mongoose.Schema.ObjectId
  },
  to: {
    user_id: mongoose.Schema.ObjectId,
    item: mongoose.Schema.ObjectId
  },
  isApproved: Boolean
}, { timestamps: true })

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = {
  Users,
  Item,
  Transaction
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
// let christianItem = new Item({
//   owner: '60ea018e6a00f038edf9cab4',
//   name: 'Hammer',
//   type: 'goods',
//   availability: true,
//   description: 'This is a hammer',
//   image_link: 'www.aws.com/asdfkqjhwe'
// })

// christianItem.save();

// let mattItem = new Item({
//   owner: '60ea018e6a00f038edf9cab3',
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
// let testTransaction = new Transaction({
//   from: {
//     user_id: '60ea018e6a00f038edf9cab4',
//     item: '60ea024abe629c3947ff89b7'
//   },
//   to: {
//     user_id: '60ea018e6a00f038edf9cab3',
//     item: '60ea024abe629c3947ff89b8'
//   },
//   isApproved: false
// })

// testTransaction.save();


/**
 * @dev This command will find all usernames that match "Christian"
 * & add a rating/review object to the ratings_reviews field
 */
// Users.update({
//   username: "Christian"
// },
//   {
//     $push :
//     {
//       ratings_reviews :
//       {
//         rating : 4,
//         review : "testing"
//       }
//     }
//   });


/**
 * @dev This command will find all usernames that match "Christian"
 * & add a transaction id to the transactions field array
 */
// Users.update({
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