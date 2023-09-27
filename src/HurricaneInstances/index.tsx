import React from "react";
import HurricaneCard from "../components/HurricaneCard";
import hurricaneData from "../Data/hurricane_data.json";
import Grid from "@mui/material/Grid";
import {Typography } from '@mui/material'
import {BrowserRouter as Router, Route, Routes, Link,} from "react-router-dom";
import { useParams } from "react-router-dom";

const HurricaneInstances = () => {
  const name = useParams();
  return (
    <>
        <Typography>
            name
        </Typography>
            <img src = "image link" alt = "no image avaliable" />
        <Typography>
            // description (from wiki api?)
            // other data (catagory, wind speeds, rainfall, counties effected)
        </Typography>
        <a href = "/Hurricanes" className = "back-button">Back </a>
    </>
  )
}

export default HurricaneInstances;