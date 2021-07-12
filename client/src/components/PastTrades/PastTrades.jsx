import React from "react";
import PastTradesList from "./PastTradesList.jsx";

const PastTrades = () => {
  return (
    <div className="past-trades-container">
      <h3>Current Trades Offers</h3>
      <div className="past-trades-list-container">
        <div className="past-trades-list-container-header">
          <div>User</div>
          <div>Date</div>
          <div>They want</div>
          <div>They offer</div>
          <div>Rating</div>
        </div>
        <PastTradesList />
      </div>
    </div>
  );
};

export default PastTrades;
