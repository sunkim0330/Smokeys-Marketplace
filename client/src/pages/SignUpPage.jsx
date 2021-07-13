import React, { useState, useEffect } from "react";
import axios from 'axios';

const SignUp = ({ currentUser }) => {
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const putNewUser = (e) => {
    e.preventDefault();
    axios.put('/user', {
      phone: phone,
      location: location
    })
  }

  return (
  <div>SignUp
    <div>We just need a little bit more info before you can start trading...</div>
    <form onSubmit={putNewUser}>
        {/* <label>
          First Name:
          <input type='text' required onChange={(e) => {setFirstName(e.target.value)}}/>
        </label>
        <label>
          Last Name:
          <input type='text' required onChange={(e) => {setLastName(e.target.value)}}/>
        </label> */}
        {/* <label>
          Email:
          <input type='email' disabled/>
        </label> */}
        <label>
          Phone Number:
          <input type='tel' placeholder='ex: 123-456-7890' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required onChange={(e) => {setPhone(e.target.value)}}/>
        </label>
        <label>
          Zip Code:
          <input type='number' placeholder='ex: 33713' required onChange={(e) => {setLocation(e.target.value)}}/>
        </label>
        <input type='submit' value='Submit' />
      </form>
  </div>
  );
};

export default SignUp;
