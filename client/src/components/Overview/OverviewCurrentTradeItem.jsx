import React from "react";
import axios from "axios";

const OverviewCurrentTradeItem = ({ item, getAllTxns }) => {
  const handleAccept = (e) => {
    axios.put(`/transactions/${item.transactionId}/complete`);
    getAllTxns();
  };

  const handleDecline = (e) => {
    axios.put(`/transactions/${item.transactionId}/complete`);
    getAllTxns();
  };

  return (
    <div className="overview-current-trade-item">
      <div>{item.fromUser.firstName}</div>
      <div>{item.date.slice(0, 10)}</div>
      <div className="overview-trade-item">{item.toItem.name}</div>
      <div className="overview-trade-item">{item.fromItem.name}</div>
      <div className="accept-decline">
        <button className="accept" onClick={handleAccept}>
          Accept
        </button>
        <button className="decline" onClick={handleDecline}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default OverviewCurrentTradeItem;
