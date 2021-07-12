import React from "react";

const OverviewCurrentTradeItem = () => {
  return (
    <div className="overview-current-trade-item">
      <div>Other User</div>
      <div>12-2-2021</div>
      <div className="overview-trade-item">Screwdriver</div>
      <div className="overview-trade-item">Hammer</div>
      <div className="accept-decline">
        <button className="accept">Accept</button>
        <button className="decline">Decline</button>
      </div>
    </div>
  );
};

export default OverviewCurrentTradeItem;
