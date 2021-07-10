const mongoose, { Schema } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  email: String,
  location: String,
  phone: Number,
  ratings_reviews: [Schema.Types.Mixed],
  transactions: [Schema.ObjectId]
})

const Users = mongoose.model('Users', UserSchema);

const ItemSchema = new Schema({
  owner: Schema.ObjectId,
  name: String,
  type: String,
  availability: Boolean,
  description: String,
  image_link: String,
  time_span: Number
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
  }
})

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = {
  Users,
  Item,
  Transaction
}