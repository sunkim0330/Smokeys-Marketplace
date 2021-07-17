import React from "react";
import PastTradesList from "./PastTradesList.jsx";

const PastTrades = ({currentUser}) => {
  return (
    <div className="past-trades-container">
      <h3>Past Trades</h3>
      <div className="past-trades-list-container">
        <div className="past-trades-list-container-header">
          <div>User</div>
          <div>Date</div>
          <div>They want</div>
          <div>They offer</div>
          <div>Contact Info</div>
          <div>Rating</div>
        </div>
        <PastTradesList currentUser={currentUser}/>
      </div>
    </div>
  );
};

export default PastTrades;
