import { Typography, Grid } from "@mui/material";
import React from "react";
import CountyCard from "./CountyCard";
import countyData from "../Data/county_data.json";

const About = () => {
  return (
    <div style={{ margin: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px",
          paddingBottom: "0px",
        }}
      >
        <Typography variant="h3">Texas Counties</Typography>
      </div>

      <div style={{ padding: "100px" }}>
        <Typography variant="subtitle1">
          <b>Southwest Hurricane Aid</b> Below is a list of all of the counties
          in Texas along with a few attributes of each county including
          attributes such as One, Two, Three, Four, Five.
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>

      <Grid container spacing={5} style={{ padding: "60px 20px 20px 20px" }}>
        {countyData.map((county) => (
          <Grid item xs={12} sm={3} style={{ padding: "10px" }}>
            <CountyCard
              name={county.Name}
              population={county.Population}
              landarea={county.Land_Area}
              region={county.region}
              precipitation={county.precipitation}
              imgurl={county.Image}
            ></CountyCard>
          </Grid>
        ))}
      </Grid>

      <div style={{ paddingLeft: "100px" }}></div>
    </div>
  );
};

export default About;
