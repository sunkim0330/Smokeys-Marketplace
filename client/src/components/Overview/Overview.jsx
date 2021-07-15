import React, { useState, useEffect } from "react";
import axios from "axios";
import OverviewCurrentTrades from "./OverviewCurrentTrades.jsx";
import EditUserModal from "./EditUserModal.jsx";

const Overview = () => {
  const [currentUserData, setCurrentUserData] = useState("");
  const [currentUserTransactionData, setCurrentUserTransactionData] = useState(
    []
  );
  const [overviewCurrentTrades, setoverviewCurrentTrades] = useState([]);
  const [totalItemsToTrade, setTotalItemsToTrade] = useState("");

  let completedTxn = 0;

  const getCurUser = () => {
    axios
      .get("/user/60ee54c3690bea0083c633c6")
      .then((response) => setCurrentUserData(response.data))
      .catch((err) => console.log(err));
  };

  const getAllTxns = () => {
    axios
      .get("/transactions/user?user_id=60ee54c3690bea0083c633c6")
      .then((response) => setoverviewCurrentTrades(response.data))
      .catch((err) => console.log(err));
  };

  const getAllItems = () => {
    axios
      .get("/items/60ee54c3690bea0083c633c6")
      // .then((response) => console.log(response.data.length))
      .then((response) => setTotalItemsToTrade(response.data.length))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCurUser();
    getAllTxns();
    getAllItems();
    axios
      .get("/transactions/?user_id=60ee54c3690bea0083c633c6&count=10")
      .then((response) => setCurrentUserTransactionData(response.data))
      .then(() => {
        currentUserTransactionData.map((item) => {
          if (item.status === "completed") {
            completedTxn++;
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const openEditModal = (e) => {
    document.querySelectorAll(".edit-user-modal-container")[0].style.display =
      "block";
  };

  return (
    <div className="overview-container">
      <EditUserModal
        currentUserData={currentUserData}
        getCurUser={getCurUser}
      />
      <div className="overview-container-top-row">
        <div className="basic-info">
          <div>
            <p className="overview-name">
              {currentUserData && currentUserData.results[0].firstName}{" "}
              {currentUserData && currentUserData.results[0].lastName}
            </p>
          </div>
          <p className="overview-community-id">
            Zip Code: {currentUserData && currentUserData.results[0].location}
          </p>
          <button className="overview-edit-user-btn" onClick={openEditModal}>
            Edit User Info
          </button>
        </div>
        <div className="overview-metadata">
          <p>Items Available for Trade: {totalItemsToTrade}</p>
          <p>Completed Transactions: {completedTxn}</p>
          <p>Total # of Reviews/Ratings: </p>
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
        />
      </div>
    </div>
  );
};

export default Overview;
