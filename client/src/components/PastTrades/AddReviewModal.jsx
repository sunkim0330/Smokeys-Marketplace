import React, {useState} from 'react';
import axios from 'axios';
import AddReviewModalForm from './AddReviewModalForm.jsx'

const AddReviewModal = ({showModal, onClose, transaction, setSubmittedReview, setShowModal}) => {

  if (!showModal) {
    return null;
  }

  return (
    <div className="add-review-modal-wrapper">
      <div className="add-review-modal-container">
        <h3>{transaction.fromItem.name}</h3>
        <h3>{transaction.fromUser.firstName}</h3>
        <AddReviewModalForm transaction={transaction} setSubmittedReview={setSubmittedReview} setShowModal={setShowModal}/>
        <button className="add-review-modal-close-button" type="button" onClick={onClose}>Close</button>
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

