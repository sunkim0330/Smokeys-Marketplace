import React from "react";

const AddNewItem = () => {
  return (
    <div className="add-new-item-container">
      <h3>What are you trading?</h3>
      <div className="add-new-item-form">
        <h4>Listing Title</h4>
        <input type="text" />
        <h4>Type</h4>
        <select name="" id="">
          <option value="product">Product</option>
          <option value="service">Service</option>
        </select>
        <h4>Description</h4>
        <textarea cols="110" rows="15"></textarea>
        <h4>Add Photos</h4>
        <div className="new-item-photo">
          <div className="new-item-photo-add">+</div>
          <div>Upload Photo</div>
        </div>
      </div>
      <button className="add-item-btn">Add Item</button>
    </div>
  );
};

export default AddNewItem;
