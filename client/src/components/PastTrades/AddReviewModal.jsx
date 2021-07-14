import React, {useState} from 'react';
import axios from 'axios';

const AddReviewModal = ({showModal, onClose, transaction}) => {
  const [error, setError] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    reviewed_id : '60ede0c21d6313096619f490',
    reviewer_id : transaction.fromUser._id,
    transaction_id : transaction.transactionId,
    ratings: [1, 2, 3, 4, 5],
    reviews: ''
  })

  const sendRequest = () => {
    axios({
      method: 'post',
      url: `/reviews/60ede0c21d6313096619f490`,
      data: formData
    })
    .then((response) => {
      alert('Submitted!')
    })
    .catch(() => {
      console.log('There was an error. Couldn\'t your add reivew')
    })
  }

  if (!showModal) {
    return null;
  }

  return (
    <div className="add-review-modal-div">
    <form className="add-review-modal-form">
      {transaction.fromUser.fromItem}
      {transaction.fromUser.firstName}
      <label className="add-review-modal-rating-label">Rating</label>
      <input className="add-review-modal-rating-input"/>
      <label className="add-review-modal-review-label">Review</label>
      <input className="add-review-modal-review-input"/>
      <button className="add-review-modal-submit-button"
        type="button"
        onSubmit={sendRequest}
      >Submit</button>
      <button className="add-review-modal-close-button" type="button" onClick={onClose}>Close</button>
    </form>
    </div>
  )
}

export default AddReviewModal;

/*
<input {...register("rating", { required: true, maxLength: 1 })} />
{errors?.rating?.type === "required" && <p>This field is required</p>}
<input {...register("review", { required: true, maxLength: 200 })} />
{errors?.review?.type === "required" && <p>This field is required</p>}
<label className="add-review-modal-rating-label">Rating</label>
<input className="add-review-modal-rating-input"/>
<label className="add-review-modal-review-label">Review</label>
<input className="add-review-modal-review-input"/>

<Controller
  name="Rating"
  control={control}
  render={({field}) => <Select
    {...field}
    options={[
      {value: 1, label: '1'},
      {value: 2, label: '2'},
      {value: 3, label: '3'},
      {value: 4, label: '4'},
      {value: 5, label: '5'}
    ]}
  />}
/>
<Controller
  name="Review"
  control={control}
  defaultValue=""
  render={({filed}) => <input {...field}/>}
/>
*/

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
