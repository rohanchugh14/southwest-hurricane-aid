import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";

interface HurricaneDataProps {
    image: string;
    name: string;
    category: string;
    date: string;
    WindSpeed: string;
    Fatalities: string;
}

export default function HurricaneCard(props: HurricaneDataProps) {
    return (
        <div style={{ maxWidth: "100%", height: "100%" }}>
            <Card
                style={{
                    maxWidth: "100%",
                    height: "100%",
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    position: "relative",
                }}
            >
                <Tooltip title="Click for More Info">
                    <Link
                        to={`HurricaneInstances/${props.name}`}
                        style={{ textDecoration: "none" }}
                    >
                        <CardActionArea>
                            <CardMedia
                                style={{ height: 220 }}
                                image={props.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {props.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    component="p"
                                >
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    >
                                        <b>Category: </b>
                                        {props.category}
                                    </Typography>
                                    <p>
                                        <b>Date: </b>
                                        {props.date}
                                    </p>
                                    <p>
                                        <b>Wind Speed: </b>
                                        {props.WindSpeed}MPH
                                    </p>
                                    <p>
                                        <b>Fatalities: </b>
                                        {props.Fatalities}
                                    </p>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Link>
                </Tooltip>
            </Card>
        </div>
    );
}
