import React  from "react";
import countyData from "../Data/county_data.json";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from '@mui/material'



const CountyInstances = () => {
  const name = useParams().instance;
  const ourCounty = countyData.find((currObject) => {
    return currObject.Name === name;
  });
  console.log(ourCounty)
  return (
    /*<>
      <h1> {name} </h1>
      <img src = {"/" + ourCounty?.Image} alt = "no image" />
      <h6> {"Image Link: " + ourCounty?.Image} </h6>
      <h1> {"Population: " + ourCounty?.Population} </h1>
      <h1> {"Land Area: " + ourCounty?.Land_Area + " sq. miles"} </h1>
      <Link to="/Counties" className = "back-button">Back </Link>
    </> */ 

    <Card sx={{ margin: "auto" , width: "50%" }}>
      <CardContent>
        <Typography variant="h1" component="div" style={{ textAlign: "center" }}>
          {ourCounty?.Name}
        </Typography>
        <Typography variant="h3" component="div" style={{ textAlign: "center" }}>
          {ourCounty?.region}
        </Typography>
        <CardMedia
          sx={{ margin: "auto" , width: "50%" }}
          component="img"
          image={"/" + ourCounty?.Image}
          alt="member image" />
        <Typography variant="body1" color="text.secondary">
          <b>Population: </b> {ourCounty?.Population}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <b>Land area: </b> {ourCounty?.Land_Area} <b> sq. miles</b>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <b>Precipitation: </b> {ourCounty?.precipitation} <b> inches</b>
        </Typography>
        <Link to={`/Aid Organizations/AidOrganizationInstances/${ourCounty?.aid}`}>
          {ourCounty?.aid}{" "}
        </Link>
        <Typography> <b> </b> </Typography>
        <Link to = {"/Hurricanes/HurricaneInstances/" + ourCounty?.Hurricane[0]}> 
          {ourCounty?.Hurricane[0]} 
        </Link>
        <Typography> <b> </b> </Typography>
        <Link to = {"/Hurricanes/HurricaneInstances/" + ourCounty?.Hurricane[1]}> 
          {ourCounty?.Hurricane[1]} <b> </b>
        </Link>
        <Typography> <b> </b> </Typography>
        <Link to="/Counties" className = "back-button">Back </Link>
    </CardContent>
  </Card>

  )
}

export default CountyInstances;