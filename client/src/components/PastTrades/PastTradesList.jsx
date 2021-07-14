import React, { useState, useEffect } from "react";
import PastTradeItem from "./PastTradeItem.jsx";
import axios from 'axios';

const PastTradesList = () => {
  const [transactions, setTransactions] = useState([]);


  //we are going to get user_id from high level component and passing down?60ede0c21d6313096619f490
  const getUserTransaction = () => {
    axios.get(`/transactions/user?user_id=60ede0c21d6313096619f490&status=completed`)
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
      <PastTradeItem transactions={transactions}/>
    </div>
  );
};

export default PastTradesList;

