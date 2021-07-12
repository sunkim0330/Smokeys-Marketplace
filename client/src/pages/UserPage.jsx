import React, { useState } from "react";
import CurrentTrades from "../components/CurrentTrades/CurrentTrades.jsx";
import Overview from "../components/Overview/Overview.jsx";

const UserPage = () => {
  const [currentTab, setCurrentTab] = useState("overview");

  const handleTabClick = (event) => {
    event.preventDefault();
    setCurrentTab(event.target.getAttribute("value"));
  };

  return (
    <div className="user-page-container">
      <h1>Welcome, Scott!</h1>
      <section>
        <ul className="tab-list">
          <li value="overview" className="tab" onClick={handleTabClick}>
            Overview
          </li>
          <li value="current-trades" className="tab" onClick={handleTabClick}>
            Current Trades
          </li>
          <li value="past-trades" className="tab" onClick={handleTabClick}>
            Past Trades
          </li>
          <li value="reviews-ratings" className="tab" onClick={handleTabClick}>
            Reviews/Ratings
          </li>
          <li value="add-new-item" className="tab" onClick={handleTabClick}>
            Add New Item
          </li>
        </ul>
        {currentTab === "overview" && <Overview />}
        {currentTab === "current-trades" && <CurrentTrades />}
      </section>
    </div>
  );
};

export default UserPage;
