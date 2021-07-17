import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import MarketplacePage from "./pages/MarketplacePage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import SplashPage from "./pages/SplashPage.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getLoggedInUser = () => {
    axios
      .get(`/user/${currentUser._id}`)
      .then((data) => {
        setCurrentUser(data.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUser = () => {
    axios
      .get("/getUser")
      .then((data) => {
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <NavBar logout={logout} isLoggedIn={isLoggedIn} />
      <Switch>
        <Route exact path="/">
          <SplashPage />
        </Route>
        <Route path="/signup">
          <SignUp currentUser={currentUser} getUser={getUser} />
        </Route>
        <Route path="/user">
          <UserPage
            currentUser={currentUser}
            getLoggedInUser={getLoggedInUser}
          />
        </Route>
        <Route path="/marketplace">
          <MarketplacePage
            currentUser={currentUser}
            getLoggedInUser={getLoggedInUser}
            getUser={getUser}
            setIsLoggedIn={setIsLoggedIn}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
