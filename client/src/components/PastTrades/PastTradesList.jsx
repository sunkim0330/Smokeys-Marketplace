import React, { useState, useEffect } from "react";
import PastTradeItem from "./PastTradeItem.jsx";
import axios from 'axios';

const PastTradesList = () => {
  const [transactions, setTransactions] = useState([]);
  const [fromUserId, setFromUserId] = useState([]);
  const [toUserId, setToUserId] = useState([]);
  const [fromUserItem, setFromUserItem] = useState([]);
  const [toUserItem, setToUserItem] = useState([]);

  //we are going to get user_id from high level component and passing down?
  const getUserTransaction = () => {
    axios.get('/transactions/?user_id=60ede0c21d6313096619f490')
    .then((response) => {
      console.log(response.data.results);
      setTransactions(response.data.results);
      // makeAxiosRequests(response.data.results);
    })
    .catch(err => console.log(err))
  }
  const filtered = () => {
    transactions.filter((transaction) => {return transaction.status === "complete"})
  }

  const makeAxiosRequests = () => {
      axios.all([
        axios.get(`/items/?user_object_id=${trx.from.user_id}`),
        axios.get(`/items/?user_object_id=${trx.to.user_id}`),
        axios.get(`/user/${from.user_id}`),
        axios.get(`/user/${to.user_id}`)
      ])
      .then(axios.spread((fromUser, toUser) => {
        console.log(fromUser, toUser)
      }))
      .catch(error => console.log(error))

  }

  useEffect(() => {
    getUserTransaction();
  }, [])

  return (
    <div>
      <PastTradeItem />
    </div>
  );
};

export default PastTradesList;

//{$match: { _id: ObjectId("60ecb85dd999d66ade9c9659")},
/*
db.items.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "owner",
      foreignField: "_id",
      as: "location"
    }
  }
])

db.items.aggregate([
  {
    $lookup: {
      from: "users",
      pipeline: [
        {$match: { location: "75050"}}
      ],
      as: "location"
    }
  }
]).pretty()

*/