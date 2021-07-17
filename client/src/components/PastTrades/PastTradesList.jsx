import React, { useState, useEffect } from "react";
import PastTradeItem from "./PastTradeItem.jsx";
import axios from 'axios';

const PastTradesList = ({currentUser}) => {
  const [transactions, setTransactions] = useState([]);

  //working user_id 60edae743ae6bb807e825822 ${currentUser._id} currentUser={currentUser}
  const getUserTransaction = () => {
    axios.get(`/transactions/user?user_id=${currentUser._id}&status=completed`)
    .then((response) => {
      setTransactions(response.data);
    })
    .catch(err => console.log(err))
  }


  useEffect(() => {
    getUserTransaction();
  }, [])

  return (
    <div>
      {(transactions && transactions.length > 0) ? (<PastTradeItem transactions={transactions} currentUser={currentUser}/>) : (<div className="reviews-no-reviews"> You have no past trades 😔</div>) }
    </div>
  );
};

export default PastTradesList;

