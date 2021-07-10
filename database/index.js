const mongoose, { Schema } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  email: String,
  location: String,
  phone: Number,
  ratings_reviews: [Schema.Types.Mixed],
  transactions: [Schema.ObjectId],
  { timestamps: true }
})

const Users = mongoose.model('Users', UserSchema);

const ItemSchema = new Schema({
  owner: Schema.ObjectId,
  name: String,
  type: String,
  availability: Boolean,
  description: String,
  image_link: String,
  { timestamps: true }
})

const Item = mongoose.model('Item', ItemSchema)

const TransactionSchema = new Schema({
  user1: {
    user_id: Schema.ObjectId,
    item: Schema.ObjectId
  },
  user2: {
    user_id: Schema.ObjectId,
    item: Schema.ObjectId
  },
  isApproved: Boolean,
  { timestamps: true }
})

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = {
  Users,
  Item,
  Transaction
}


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