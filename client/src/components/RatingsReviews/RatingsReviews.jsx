import React from "react";
import RatingsReviewsList from "./RatingsReviewsList.jsx";


const RatingsReviews = ({ currentUser }) => {

  return (
    <div className="ratings-reviews-container">
      <h3>Past Reviews</h3>
      <div className="ratings-reviews-list-container">
        <div className="ratings-reviews-list-container-header">
          <div className="review-date">Date</div>
          <div className="review-trx">Transaction ID</div>
          <div className="review-rating">Rating</div>
          <div className="review-review">Review</div>
        </div>
        <RatingsReviewsList currentUser={ currentUser }/>
      </div>
    </div>
  );
};

export default RatingsReviews;
