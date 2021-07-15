import React, {useState} from 'react';
import axios from 'axios';

const AddReviewModalForm = ({transaction}) => {
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    reviewed_id : transaction.fromUser._id,
    reviewer_id : '60ede0c21d6313096619f490',
    transaction_id: transaction.transactionId,
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
      setSubmitted(true)
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
        <select onChange={handleRatingChange} >
          <option defaultValue="0">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <label className="add-review-modal-review-label" name="reivew">Review</label>
        <textarea className="add-review-modal-review-input" onChange={handleReviewChange} placeholder="write your review here"/>
        {!submitted ? (<button className="add-review-modal-submit-button"
          type="submit" value="submit"
        >Submit</button>)  : ('Submitted')}
         {/* <button className="add-review-modal-submit-button"
          type="submit" value="submit"
        >Submit</button> */}
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

