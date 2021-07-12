import React from "react";
import OverviewCurrentTrades from "./OverviewCurrentTrades.jsx";

const Overview = () => {
  return (
    <div className="overview-container">
      <div className="overview-container-top-row">
        <div className="basic-info">
          <div>
            <p className="overview-name">Scotty Scott</p>
            <p className="overview-address">837 Scottsville Rd.</p>
            <p className="overview-address">Some city, State 01012</p>
          </div>
          <p className="overview-community-id">Community ID</p>
          <button className="overview-edit-user-btn">Edit User Info</button>
        </div>
        <div className="overview-metadata">
          <p>Current Trade Numbers</p>
          <p>Past Trade Numbers</p>
          <p>Reviews and Ratings Numbers</p>
        </div>
      </div>
      <div className="overview-cur-trade-title">Current Trade Offers</div>
      <div className="overview-cur-trade-offer-container">
        <div className="overview-cur-trade-offer-header">
          <div>User</div>
          <div>Date</div>
          <div>They want</div>
          <div>They offer</div>
          <div>Confirm Y / N</div>
        </div>
        <OverviewCurrentTrades />
      </div>
    </div>
  );
};

export default Overview;
