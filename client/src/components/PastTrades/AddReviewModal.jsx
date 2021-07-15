import React, {useState} from 'react';
import axios from 'axios';

const AddReviewModal = ({showModal, onClose, transaction, setSubmittedReview, setShowModal}) => {
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    reviewed_id: transaction.fromUser._id,
    reviewer_id : '60ede0c21d6313096619f490',
    transaction_id: transaction.transactionId,
    rating: null,
    review: ''
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

  if (!showModal) {
    return null;
  }

  return (
    <div className="add-review-modal-wrapper">
      <div className="add-review-modal-container">
        <h3>{transaction.fromItem.name}</h3>
        <h3>{transaction.fromUser.firstName}</h3>
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
        <label className="add-review-modal-review-label" name="reivew">Review</label>
        <textarea className="add-review-modal-review-input" onChange={handleReviewChange} required placeholder="write your review here"/>
         <button className="add-review-modal-btn"
          type="submit" value="submit"
        >Submit</button>
    </form>
        <button className="add-review-modal-btn" type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default AddReviewModal;

// /* ADD REVIEW MODAL STYLING*/
// .add-review-modal-wrapper {
//   z-index: 5;
//   position: fixed;
//   left: 0;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-family:'Roboto', sans-serif;
//   background-color: #D3D9D9;
//   background-color: rgba(0,0,0,0.5);
//   display: flex;
//   flex-direction: column;
// }
// .add-review-modal-container {
//   width: 500px;
//   height: 250px;
//   background-color: #3A5A40;
//   display: flex;
//   flex-direction: column;
//   padding: 10px;
//   border-top: 1px solid #eee;
//   border-bottom: 1px solid #eee;
// }

// .add-review-modal-form {
//   padding: 10px;
//   border-top: 1px solid #eee;
//   border-bottom: 1px solid #eee;
//   background-color: #D3D9D9;
//   display: flex;
//   flex-direction: column;
// }

// .add-review-modal-submit-button,
// .add-review-modal-close-button {
//   border: transparent;
//   margin: 5px;
//   background-color: transparent;
//   cursor: pointer;
// }

