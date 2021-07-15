import React, { useState } from "react";
import axios from "axios";

const EditUserModal = ({ currentUserData, getCurUser }) => {
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
      firstName: currentUserData.results[0].firstName,
      lastName: currentUserData.results[0].lastName,
      email: currentUserData.results[0].email,
      phone: phone === "" ? currentUserData.results[0].phone : phone,
      location: zip === "" ? currentUserData.results[0].location : zip,
    };
    axios
      .put("/user/60ee54c3690bea0083c633c6", data)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(`Error: ${err}`));
    document.querySelectorAll(".edit-user-modal-container")[0].style.display =
      "none";
    getCurUser();

    setPhone("");
    setZip("");
  };

  return (
    <div className="edit-user-modal-container" style={{ display: "none" }}>
      <div className="edit-user-modal">
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
          <div onClick={handleCancel}>Cancel</div>
          <input type="submit" value="Submit" />
        </form>
        {/* <p>Zip</p>
        <div className="btn-container">
        </div> */}
      </div>
    </div>
  );
};

export default EditUserModal;
