import React, { useState, useEffect } from "react";
import axios from 'axios'
const AddNewItem = ({ currentUser }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('goods')
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState(null)

  const submitItem = () => {
    // let body = ({
    //   name: name,
    //   type: type,
    //   description: description
    // })
    // axios.post(`/items/${currentUser._id}`, body)
    // .then(res => console.log(res))
    const reader = new FileReader()
    var dataEntry = reader.readAsDataURL(photos)
    console.log({photos, dataEntry})
  }

  return (
    <div className="add-new-item-container">
      <h3>What are you trading?</h3>
      <div className="add-new-item-form">
        <h4>Listing Title</h4>
        <input onChange={e => setName(e.target.value)} type="text" />
        <h4>Type</h4>
        <select onChange={e => setType(e.target.value)} name="" id="">
          <option value="goods">Goods</option>
          <option value="service">Service</option>
        </select>
        <h4>Description</h4>
        <textarea onChange={e => setDescription(e.target.value)} cols="110" rows="15"></textarea>
        <h4>Add Photos</h4>
        <div className="new-item-photo">
          <div className="new-item-photo-add">+</div>
          <input type="file" name="filename" onChange={e => setPhotos(e.target.files[0])}/>
          <div>Upload Photo</div>
        </div>
      </div>
      <button onClick={submitItem} className="add-item-btn">Add Item</button>
    </div>
  );
};

export default AddNewItem;
