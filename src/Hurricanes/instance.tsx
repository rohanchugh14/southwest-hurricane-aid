import React from "react";
import HurricaneCard from "../components/HurricaneCard";
import hurricaneData from "../Data/hurricane_data.json";
import Grid from "@mui/material/Grid";
import {Typography } from '@mui/material'

const Hurricanes = () => {
  return (
    <>
        <Typography>
            // hurricane name
        </Typography>
            //<img src = "image link" alt = "no image avaliable" />
        <Typography>
            // description (from wiki api?)
            // other data (catagory, wind speeds, rainfall, counties effected)
        </Typography>
        <a href = "back" className = "back-button">Back </a>
    </>
  )
}