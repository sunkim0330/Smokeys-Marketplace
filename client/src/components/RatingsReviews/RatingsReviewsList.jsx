
import React, { useState, useEffect } from "react";
import RatingReviewsItem from "./RatingsReviewsItem.jsx";
import axios from 'axios';

const RatingReviewsList = ({ currentUser }) => {
  const [reviews, setReviews] = useState(null);

  const id = currentUser.id;
  const getReviews = (id) => {
    axios.get(`/reviews/${id}`)
      .then(({data}) => {
        setReviews(data);
      })
  }
  useEffect(() => {
    getReviews(id);
  }, [])

  return (
    <div>
      { reviews ? reviews.results.map((review) => {
          return <RatingReviewsItem
          key={review.transaction_id}
          date={review.createdAt}
          transaction_id={review.transaction_id}
          rating={review.ratings}
          review={review.reviews}
          />
        }) : <div className="reviews-no-reviews"> You have no reviews 😔</div>
      }
      </div>
  );
};

export default RatingReviewsList;
