import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import axios from 'axios';

const SplashPage = ({ getUserInfo, isLoggedIn, currentUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  const postNewUser = (e) => {
    e.preventDefault();
    axios.post('/user', {
      firstName: firstName,
      lastName: lastName,
      email: currentUser.email,
      phone: phone,
      location: location
    })
  }


  return (
    <div>
    {!isLoggedIn && (
        <div>
          <h2>Please Login</h2>
          <button onClick={getUserInfo}>Login Using Google</button>
        </div>
      )
    }
    {isLoggedIn && !currentUser.isUser && (
      <form onSubmit={postNewUser}>
        <label>
          First Name:
          <input type='text' value={currentUser.results[0].firstName} required onChange={(e) => {setFirstName(e.target.value)}}/>
        </label>
        <label>
          Last Name:
          <input type='text' value={currentUser.results[0].lastName} required onChange={(e) => {setLastName(e.target.value)}}/>
        </label>
        <label>
          Email:
          <input type='email' value={currentUser.results[0].email} disabled/>
        </label>
        <label>
          Phone Number:
          <input type='tel' placeHolder='ex: 123-456-7890' pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' required onChange={(e) => {setPhone(e.target.value)}}/>
        </label>
        <label>
          Zip Code:
          <input type='number' placeHolder='ex: 33713' required onChange={(e) => {setLocation(e.target.value)}}/>
        </label>
        <input type='submit' value='Submit' />
      </form>
    )}
    {isLoggedIn && currentUser.isUser && (<Redirect to="/marketplace"/>)}
    </div>
  )
};

export default SplashPage;
