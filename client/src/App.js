import React, { useState } from "react";
import { Route } from "react-router-dom";
import BubblePage from './components/BubblePage'
import PrivateRoute from './components/PrivateRoute'

import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Login} />
      <PrivateRoute exact path='/bubble_page' component={BubblePage} />
    </div>

  );
}

export default App;
