import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';
import MarketplacePage from "./pages/MarketplacePage.jsx";
import SignUp from "./pages/SignUp.jsx";
import UserPage from "./pages/UserPage.jsx";
import SplashPage from "./pages/SplashPage.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {


  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <SplashPage/>
        </Route>
        <Route path="/signup">
          <SignUp />
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
