import React from "react";

const RatingsReviewsItem = (props) => {
  const {date, transaction_id, review, rating} = props;
  return (
    // null
    <div className="ratings-reviews-item-container">
      <div className="review-date-item">{date.slice(0,10)}</div>
      <div className="review-trx-item">{transaction_id}</div>
      <div className="review-rating-item">
        {'★★★★★'.slice(0,rating)}
      </div>
      <div className="review-review-item">{review}</div>
    </div>
  );
};

export default RatingsReviewsItem;
