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
      .put("/user/60ef401cdb302e3e61951709", data)
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
        <p>Phone</p>
        <input
          type="tel"
          pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
          value={phone}
          onChange={handlePhoneChange}
        />
        <p>Zip</p>
        <input
          type="number"
          pattern="/(^\d{5}$)|(^\d{5}-\d{4}$)/"
          value={zip}
          onChange={handleZipChange}
        />
        <div className="btn-container">
          <div onClick={handleCancel}>Cancel</div>
          <div onClick={handleSubmit}>Submit</div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
