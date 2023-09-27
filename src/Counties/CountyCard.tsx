import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
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
        <Card
            sx={{
                width: 300,
                boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
        >
            <Tooltip title="Click for More Info">
                <Link
                    to={`CountyInstances/${props.name}`}
                    style={{ textDecoration: "none" }}
                >
                  <CardActionArea>
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

                        <Typography variant="body1" color="text.secondary" style={{
                          marginTop: "5px"
                        }}>
                            <b>Population: </b> {props.population}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" style={{
                          marginTop: "5px"
                        }}>
                            <b>Land Area: </b> {props.landarea}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" style={{
                          marginTop: "5px"
                        }}>
                            <b>Region: </b> {props.region}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" style={{
                          marginTop: "5px"
                        }}>
                            <b>Avg Mean Precipitation: </b>{" "}
                            {props.precipitation} in.
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </Link>
            </Tooltip>
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
