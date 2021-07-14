import React, { useState, useEffect } from "react";
import RatingReviewsItem from "./RatingsReviewsItem.jsx";
import axios from 'axios';

const RatingReviewsList = () => {
  const [reviews, setReviews] = useState(null);

  const id = '60eac1d6a0e0293f05e414cf';
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
      { reviews && reviews.results.map((review) => {
          return <RatingReviewsItem
          key={review.transaction_id}
          date={review.createdAt}
          transaction_id={review.transaction_id}
          rating={review.ratings}
          review={review.reviews}
          />
        })
      }
    </div>
  );
};

export default RatingReviewsList;
