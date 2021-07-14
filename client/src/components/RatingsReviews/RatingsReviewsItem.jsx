import React from "react";

const RatingsReviewsItem = (props) => {
  const {date, transaction_id, review, rating} = props;
  return (
    // null
    <div className="past-trade-item-container">
      <div>{date.slice(0,10)}</div>
      <div>{transaction_id}</div>
      <div className="rating">
        {'★★★★★'.slice(0,rating)}
      </div>
      <div className="review">{review}</div>
    </div>
  );
};

export default RatingsReviewsItem;
