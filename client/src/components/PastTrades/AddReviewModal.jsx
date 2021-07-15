import React, {useState} from 'react';
import axios from 'axios';
import AddReviewModalForm from './AddReviewModalForm.jsx'

const AddReviewModal = ({showModal, onClose, transaction, setSubmittedReview, setShowModal}) => {

  if (!showModal) {
    return null;
  }

  return (
    <div className="add-review-modal-div">
      <h3>{transaction.fromUser.fromItem}</h3>
      <h3>{transaction.fromUser.firstName}</h3>
      <AddReviewModalForm transaction={transaction} setSubmittedReview={setSubmittedReview} setShowModal={setShowModal}/>
      <button className="add-review-modal-close-button" type="button" onClick={onClose}>Close</button>
    </div>
  )
}

export default AddReviewModal;

// /* ADD REVIEW MODAL STYLING*/
// .add-review-modal-div {
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
// }
