import React from "react";
import RatingsReviewsList from "./RatingsReviewsList.jsx";


const RatingsReviews = ({ currentUser }) => {

  return (
    <div className="ratings-reviews-container">
      <h3>Past Reviews</h3>
      <div className="ratings-reviews-list-container">
        <div className="ratings-reviews-list-container-header">
          <div>Date</div>
          <div>Transaction ID</div>
          <div>Rating</div>
          <div>Review</div>
        </div>
        <RatingsReviewsList currentUser={ currentUser }/>
      </div>
    </div>
  );
};

export default RatingsReviews;
