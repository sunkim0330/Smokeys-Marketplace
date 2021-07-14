import React, { useState, useEffect } from "react";
import AddNewItem from "../components/AddNewItem/AddNewItem.jsx";
import CurrentTrades from "../components/CurrentTrades/CurrentTrades.jsx";
import Overview from "../components/Overview/Overview.jsx";
import PastTrades from "../components/PastTrades/PastTrades.jsx";
import axios from 'axios';
import RatingsReviews from "../components/RatingsReviews/RatingsReviews.jsx"

const UserPage = ({ currentUser }) => {
  const [currentTab, setCurrentTab] = useState("add-new-item");

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
            Current Items
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
        {currentTab === "current-trades" && <CurrentTrades currentUser={currentUser} />}
        {currentTab === "past-trades" && <PastTrades />}
        {currentTab === "add-new-item" && <AddNewItem />}
        {currentTab === "reviews-ratings" && <RatingsReviews />}
      </section>
    </div>
  );
};

export default UserPage;
