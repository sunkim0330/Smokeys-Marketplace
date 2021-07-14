import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';
import MarketplacePage from "./pages/MarketplacePage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import SplashPage from "./pages/SplashPage.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {

  const [currentUser, setCurrentUser] = useState(null);

  const getUser = () => {
    axios.get('/getUser')
    .then(data => {
      setCurrentUser(data.user);
    })
    .catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getUser();
  })


  return (
    <Router>
      <NavBar />
      <Switch>

        <Route exact path="/">
          <SplashPage/>
        </Route>
        <Route path="/signup">
          <SignUp currentUser={currentUser}/>
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>
        <Route path="/marketplace">
          <MarketplacePage />
        </Route>

      </Switch>
    </Router >
  );
};

export default App;
