import React, { useState, useEffect } from "react";
import PastTradeItem from "./PastTradeItem.jsx";
import axios from 'axios';

const PastTradesList = ({currentUser}) => {
  const [transactions, setTransactions] = useState([]);

  const getUserTransaction = () => {
    axios.get(`/transactions/user?user_id=60ede0c21d6313096619f490&status=completed`)
    .then((response) => {
      console.log('user transaction',response.data)
      setTransactions(response.data);
    })
    .catch(err => console.log(err))
  }


  useEffect(() => {
    getUserTransaction();
  }, [])

  return (
    <div>
      <PastTradeItem transactions={transactions} currentUser={currentUser}/>
    </div>
  );
};

export default PastTradesList;

