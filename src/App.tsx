import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import About from "./About";
import Hurricanes from "./Hurricanes";


function App() {
  return (      
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/about" element = {<About />} />
        <Route path="/hurricanes" element = {<Hurricanes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
