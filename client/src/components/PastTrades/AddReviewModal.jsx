import React, {useState, useEffect} from 'react';
import axios from 'axios';

const AddReviewModal = ({showModal, transaction, setShowModal, currentUser, onClose}) => {
  const [submittedReview, setSubmittedReview] = useState(false);
  const [formData, setFormData] = useState({
    reviewed_id: transaction.fromUser._id,
    reviewer_id : currentUser._id,
    transaction_id: transaction.transactionId,
    ratings: null,
    reviews: ''
  })

  const sendRequest = (e) => {
    e.preventDefault()
    axios({
      method: 'POST',
      url: `/reviews/${currentUser._id}`,
      data: formData
    })
    .then((response) => {
      setSubmittedReview(true)
    })
    .then(() => {
      axios.put(`/transactions/${transaction.transactionId}/review-left`)
      .then(() => {
        console.log('updated review status in transaction')
      })
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

  if (!showModal) {
    return null;
  }


  return (
    <div className="add-review-modal-wrapper">
      <div className="add-review-modal-container">
        <div className="add-review-modal-headers">
          <h2>Add a review for {transaction.fromUser.firstName}!</h2>
          <h3>{transaction.fromItem.name}</h3>
        </div>
        <form className="add-review-modal-form" onSubmit={e => sendRequest(e)}>
          <label className="add-review-modal-rating-label">Rating</label>
          <select className="add-review-modal-select" required onChange={handleRatingChange}>
            <option defaultValue="0">Select</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <label className="add-review-modal-review-label" name="reivew">How was your experience? What did you love/not love?</label>
          <textarea className="add-review-modal-review-input" onChange={handleReviewChange} required placeholder="Write your review here"/>
          <div className="add-review-modal-btn-flexbox">
          {!submittedReview ? (<button className="add-item-btn one"
            type="submit" value="submit">
              Submit
          </button>) : (<div>Submitted!</div>)}
          <button className="add-item-btn two" type="button" onClick={onClose}>Close</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default AddReviewModal;

