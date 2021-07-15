import React, { useState } from "react";
import axios from "axios";

const EditUserModal = ({ getUser, currentUser }) => {
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");

  const handleZipChange = (e) => {
    setZip(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleCancel = () => {
    document.querySelectorAll(".edit-user-modal-container")[0].style.display =
      "none";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: phone === "" ? currentUser.phone : phone,
      location: zip === "" ? currentUser.location : zip,
    };
    axios
      .put(`/user/${currentUser._id}`, data)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(`Error: ${err}`));
    document.querySelectorAll(".edit-user-modal-container")[0].style.display =
      "none";
    getUser();

    setPhone("");
    setZip("");
  };

  return (
    <div className="edit-user-modal-container" style={{ display: "none" }}>
      <div className="edit-user-modal">
        <h2>Edit Information</h2>
        <form className="edit-user-modal-form" onSubmit={handleSubmit}>
          <label>
            Phone
            <input
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              value={phone}
              onChange={handlePhoneChange}
            />
          </label>
          <label>
            Zip
            <input
              type="text"
              pattern="[0-9]*"
              minLength="5"
              maxLength="5"
              value={zip}
              onChange={handleZipChange}
            />
          </label>
          <input className="edit-user-modal-btn" type="submit" value="Submit" />
          <div className="edit-user-modal-btn" onClick={handleCancel}>
            Cancel
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
