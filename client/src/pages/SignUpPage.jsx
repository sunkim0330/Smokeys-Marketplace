import React, { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

const SignUp = ( {currentUser, getUser} ) => {
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [success, setSuccess] = useState(false);

  const putNewUser = (e) => {
    e.preventDefault();
    axios.put(`/user/${currentUser._id}`, {
      phone: phone,
      location: location,
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName
    })
    .then(() => {
      setSuccess(true);
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getUser();
  }, []);


  return (
  <div className='splash'>
    <h1>Thanks for signing up!</h1>
    <h2>We just need a little bit more info before you can start trading...</h2>
    <div id='loadImage'></div>
    <div className='signUpForm'>
      <form className='newUserForm' onSubmit={putNewUser}>
          <label>
            Phone Number:
            <input type='tel' placeholder='ex: 123-456-7890' pattern='[0-9]{3}[0-9]{3}[0-9]{4}' required onChange={(e) => {setPhone(e.target.value)}}/>
          </label>
          <label>
            Zip Code:
            <input type='text' placeholder='ex: 33713' pattern='[0-9]*' minLength='5' maxLength='5' required onChange={(e) => {setLocation(e.target.value)}}/>
          </label>
          <input type='submit' value='Submit' className='add-item-btn'/>
        </form>
    </div>
      {success && (<Redirect to="/marketplace" />)}
  </div>
  );
};

export default SignUp;
