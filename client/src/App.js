import React from "react";
import AddComponent from "./AddComponent/AddComponent";
import HomeComponent from "./HomeComponent/HomeComponent";
import FooterComponent from "./FooterComponent/FooterComponent";

import { BrowserRouter as Router, Route } from "react-router-dom";
import ReactGA from "react-ga";

function initializeGA() {
  ReactGA.initialize("UA-162109811-1");
  ReactGA.pageview(window.location.pathname + window.location.search);
}

function App() {
  initializeGA();
  return (
    <Router>
      <Route path="/" exact component={HomeComponent} />
      <Route path="/add" component={AddComponent} />
      <FooterComponent />
    </Router>
  );
}

export default App;
