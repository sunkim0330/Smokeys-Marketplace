import React from "react";
import Overview from "../components/Overview/Overview.jsx";

const UserPage = () => {
  return (
    <div className="user-page-container">
      <h1>Welcome, Scott!</h1>
      <section>
        <ul className="tab-list">
          <li className="tab">Overview</li>
          <li className="tab">Current Trades</li>
          <li className="tab">Past Trades</li>
          <li className="tab">Reviews/Ratings</li>
          <li className="tab">Add New Item</li>
        </ul>
        <Overview />
      </section>
    </div>
  );
};

export default UserPage;
