import React, { useState, useEffect } from "react";
import axios from "axios";
import OverviewCurrentTrades from "./OverviewCurrentTrades.jsx";
import EditUserModal from "./EditUserModal.jsx";

const Overview = ({ currentUser, getLoggedInUser }) => {
  const [currentUserTransactionData, setCurrentUserTransactionData] =
    useState(0);
  const [overviewCurrentTrades, setoverviewCurrentTrades] = useState([]);
  const [totalItemsToTrade, setTotalItemsToTrade] = useState("");
  const [totalRatingsAndReviews, setTotalRatingsAndReviews] = useState(0);

  const getAllTxns = () => {
    axios
      .get(`/transactions/user?user_id=${currentUser._id}`)
      .then((response) => setoverviewCurrentTrades(response.data))
      .catch((err) => console.log(err));
  };

  const getAllItems = () => {
    axios
      .get(`/items/${currentUser._id}`)
      .then((response) => setTotalItemsToTrade(response.data.length))
      .catch((err) => console.log(err));
  };

  const getAllCompletedTxns = () => {
    axios
      .get(`/transactions/?user_id=${currentUser._id}&count=10`)
      .then((response) => {
        setCurrentUserTransactionData(
          response.data.results.filter((item) => item.status === "completed")
            .length
        );
      })
      .catch((err) => console.log(err));
  };

  const getRatingandReviews = () => {
    axios
      .get(`/reviewSize/${currentUser._id}`)
      .then((response) => setTotalRatingsAndReviews(response.data.size))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getLoggedInUser(); //change
    getAllTxns();
    getAllItems();
    getAllCompletedTxns();
    getRatingandReviews();
  }, []);

  const openEditModal = (e) => {
    document.querySelectorAll(".edit-user-modal-container")[0].style.display =
      "block";
  };

  return (
    <div className="overview-container">
      <EditUserModal
        currentUser={currentUser}
        getLoggedInUser={getLoggedInUser} //change
      />
      <div className="overview-container-top-row">
        <div className="basic-info">
          <div>
            <p className="overview-name">
              {currentUser.firstName} {currentUser.lastName}
            </p>
          </div>
          <p className="overview-community-id">
            Zip Code: {currentUser.location}
          </p>
          <button className="overview-edit-user-btn" onClick={openEditModal}>
            Edit User Info
          </button>
        </div>
        <div className="overview-metadata">
          <p>Items Available for Trade: {totalItemsToTrade}</p>
          <p>Completed Transactions: {currentUserTransactionData}</p>
          <p>Total # of Reviews/Ratings: {totalRatingsAndReviews}</p>
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
        <OverviewCurrentTrades
          overviewCurrentTrades={overviewCurrentTrades}
          getAllTxns={getAllTxns}
          getAllCompletedTxns={getAllCompletedTxns}
        />
      </div>
    </div>
  );
};

export default Overview;
