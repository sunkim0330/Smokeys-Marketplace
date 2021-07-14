import React, {useState} from 'react';
import { useForm } from "react-hook-form";

const AddReviewModal = ({showModal, onClose}) => {

  if (!showModal) {
    return null;
  }

  return (
    <div className="add-review-modal-div">
    <form className="add-review-modal-form">
      <title className="add-review-modal-title">Add Review</title>
      <label className="add-review-modal-rating-label">Rating</label>
      <input className="add-review-modal-rating-input"/>
      <label className="add-review-modal-review-label">Review</label>
      <input className="add-review-modal-review-input"/>
      <button className="add-review-modal-submit-button" type="button">Submit</button>
      <button className="add-review-modal-close-button" type="button" onClick={onClose}>Close</button>
    </form>
    </div>
  )
}

export default AddReviewModal;