import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

const SplashPage = () => {


  return (
    <div>
      <div className='splash'>
          <h1>Smokey's Marketplace</h1>
          <h2>A place to trade goods or services with your neighbors</h2>
        <div id='loadImage'>
        </div>
        <div className='splashButtons'>
          <div className='add-item-btn'><a href="/google">LOGIN</a></div>
          <div className='add-item-btn'><a href="/google">SIGN UP</a></div>
        </div>
      </div>
    </div>
  )
};

export default SplashPage;
