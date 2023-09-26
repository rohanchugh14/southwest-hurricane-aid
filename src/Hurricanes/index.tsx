import React from "react";
import HurricaneCard from "../components/HurricaneCard";
import hurricaneData from "../Data/hurricane_data.json";
import Grid from "@mui/material/Grid";

const Hurricanes = () => {
  return (
    <Grid container spacing={5} style={{ padding: "60px 20px 20px 20px" }}>
      {hurricaneData.map((hurricane) => (
        <Grid item xs={12} sm={3} style={{ padding: "10px" }}>
          <HurricaneCard
            // image={hurricane.image}
            name={hurricane.Name}
            category={hurricane.Category}
            date={hurricane.Date}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Hurricanes;