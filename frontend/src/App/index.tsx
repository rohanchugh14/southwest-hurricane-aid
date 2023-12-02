import React from "react";
import "./App.css";
import Home from "../Home";
import Navbar from "../Navbar";
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router-dom";
import About from "../About";
import Hurricanes from "../Hurricanes";
import Counties from "../Counties";
import AidOrganizations from "../Aid Organizations";
import HurricaneInstances from "../HurricaneInstances";
import CountyInstances from "../CountyInstances";
import AidOrganizationInstances from "../AidOrganizationInstances";
import ProviderVisualizations from "../Provider Visualizations/ProviderVisualizations";
import Search from "../Search"; 
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";
import theme from "./Themes";
import OurVisualizations from "../Our Visualizations";

function App() {
  return (
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/about" element = {<About />} />
        <Route path="/hurricanes/:instance" element = {<Hurricanes/>} />
        <Route path="/counties/:instance" element = {<Counties />} />
        <Route path="/Aid Organizations/:instance" element = {<AidOrganizations />} />
        <Route path="/Aid Organizations/AidOrganizationInstances/:instance" element = {<AidOrganizationInstances />} />
        <Route path="/Hurricanes/HurricaneInstances/:instance" element = {<HurricaneInstances />} />
        <Route path="/Counties/CountyInstances/:instance" element = {<CountyInstances />} />
        <Route path="/Our Visualizations/:instance" element = {<OurVisualizations />} />
        <Route path="/Provider Visualizations/:instance" element = {<ProviderVisualizations />} />
        <Route path="/Search/:searchTerm" element={<Search />} /> 
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
