import React from "react";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import About from "./About";
import Hurricanes from "./Hurricanes";
import Counties from "./Counties";
import HurricaneInstances from "./HurricaneInstances";



function App() {
  return (      
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/about" element = {<About />} />
        <Route path="/hurricanes" element = {<Hurricanes />} />
        <Route path="/counties" element = {<Counties />} />
        <Route path="hurricaneinstances/:instance" element = {<HurricaneInstances />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
