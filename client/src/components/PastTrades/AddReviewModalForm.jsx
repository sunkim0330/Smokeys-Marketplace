import React, {useState} from 'react';
import axios from 'axios';

const AddReviewModalForm = ({transaction, setSubmittedReview, setShowModal}) => {
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    reviewed : transaction.fromUser._id,
    reviewer : '60ede0c21d6313096619f490',
    transaction: transaction.transactionId,
    ratings: null,
    reviews: ''
  })


  const sendRequest = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: `/reviews/60ede0c21d6313096619f490`,
      data: formData
    })
    .then((response) => {
      alert('thank you for submitting your review!')
      setSubmittedReview(true)
      console.log('submitted', response)
    })
    .catch(() => {
      console.log('There was an error. Couldn\'t your add reivew')
    })
  }

  const handleReviewChange = (e) => {
    setFormData({
      ...formData,
      reviews: e.target.value
    })
  }

  const handleRatingChange = (e) => {
    setFormData({
      ...formData,
      ratings: e.target.value
    })
  }

  return (
    <form className="add-review-modal-form" onSubmit={e => sendRequest(e)}>
        <label className="add-review-modal-rating-label">Rating</label>
        <select required onChange={handleRatingChange}>
          <option defaultValue="0">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label className="add-review-modal-review-label" name="reivew">Review</label>
        <textarea className="add-review-modal-review-input" onChange={handleReviewChange} required placeholder="write your review here"/>
         <button className="add-review-modal-submit-button"
          type="submit" value="submit"
        >Submit</button>
    </form>
  )
}

export default AddReviewModalForm;


  // const submitButton = () => {
  //   if (submitted === true) {
  //     return <div>Submitted!</div>
  //   } else {
  //     return (
  //       <button className="add-review-modal-submit-button"
  //       type="submit" value="submit"
  //     >Submit</button>
  //     )
  //   }
  // }

