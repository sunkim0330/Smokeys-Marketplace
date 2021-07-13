import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MarketplacePage from "./pages/MarketplacePage.jsx";
import UserPage from "./pages/UserPage.jsx";
import SplashPage from "./pages/SplashPage.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
      <Route exact path="/">
        <SplashPage />
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
