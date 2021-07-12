import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';
import MarketplacePage from "./pages/MarketplacePage.jsx";
import UserPage from "./pages/UserPage.jsx";
import SplashPage from "./pages/SplashPage.jsx";

const App = () => {

  const [currentUser, setCurrentUser] = useState({
    "user_id": "60ec7f5530509e56fa050fe7",
    "results": [
        {
            "ratings_reviews": [],
            "transactions": [],
            "_id": "60ec7f5530509e56fa050fe7",
            "firstName": "Scotty",
            "lastName": "Scottman",
            "email": "meowmeow@meow.com",
            "phone": 2223334444,
            "location": "77388",
            "createdAt": "2021-07-12T17:43:49.789Z",
            "updatedAt": "2021-07-12T17:52:01.789Z",
            "__v": 0
        }
    ],
    isUser: false
   }
   );
   const [isLoggedIn, setIsLoggedIn] =useState(false);

  const getUserInfo = () => {
    axios.get('/google')
    .then((data) => {
      if (data.isUser) {
        setIsLoggedIn(true);
        setCurrentUser(data);
      } else {
        setCurrentUser(data);
      }
    })

  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SplashPage
          getUserInfo={getUserInfo}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          />
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>
        <Route path="/marketplace">
          <MarketplacePage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
