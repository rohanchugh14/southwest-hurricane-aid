import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const CountyCard = (props: {
  name: string;
  imgurl: string;
  population: string;
  landarea: string;
  region: string;
  precipitation: string;
}) => {
  return (
    <Card sx={{ width: 300 }}>
      <Link
        to={`CountyInstances/${props.name}`}
        style={{ textDecoration: "none" }}
      >
        <CardContent>
          <CardMedia
            component="img"
            image={props.imgurl}
            width="10%"
            height="10%"
            alt="member image"
          />

          <Typography
            variant="h5"
            component="div"
            style={{ textAlign: "center" }}
          >
            {props.name}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            <b>Population: </b> {props.population}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            <b>Land Area: </b> {props.landarea}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            <b>Region: </b> {props.region}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            <b>Avg Mean Precipitation: </b> {props.precipitation} in.
          </Typography>

          <li key={props.name}>
            <Link to={`CountyInstances/${props.name}`}>{"Learn More"} </Link>
          </li>
        </CardContent>
      </Link>
    </Card>
  );
};

CountyCard.defaultProps = {
  name: "Firstname Lastname",
  imgurl: "logo192.png",
  population: "0",
  region: "None",
  precipitation: "0",
  landarea: "0",
};

export default CountyCard;
