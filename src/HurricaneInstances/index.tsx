import React from "react";
import hurricaneData from "../Data/hurricane_data.json";
import { Link, useParams } from "react-router-dom";
import {  Card, Fab, List, ListItem, ListItemText, Typography } from "@mui/material";


const HurricaneInstances = () => {
  const name = useParams().instance;
  const ourHurricane = hurricaneData.find((currObject) => {
    return currObject.Name === name;
  });
  console.log(ourHurricane)
  return (
    <>
        <Card sx={{
          margin: "auto", 
           width: "50%", 
           marginTop: 5,
           marginBottom: 5,
           boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
           backgroundColor: "grey"}}>


          <Link style={{textDecoration: "none", color: "inherit"}} to = "/Hurricanes" className = "back-button">   
            <Fab sx={{margin: 1}}>Back </Fab>
          </Link>

          <Typography variant="h1" textAlign="center">{name}</Typography>
          <img src = {ourHurricane?.Image} width="100%" alt="hurricane"/>

          <List component="nav" aria-label="mailbox folders">
            <ListItem divider>
              <ListItemText primary={"Category "} secondary={ourHurricane?.Category}  />
            </ListItem>
            <ListItem divider>
              <ListItemText primary={"Date "} secondary={ourHurricane?.Date} />
            </ListItem>
            <ListItem divider>
              <ListItemText primary={"Wind Speed "} secondary={ourHurricane?.WindSpeed + " MPH"} />
            </ListItem>
            <ListItem>
              <ListItemText primary={"Fatalities "} secondary={ourHurricane?.Fatalities} />
            </ListItem>
          </List>

        </Card>
      
    </>
  )
}

export default HurricaneInstances;