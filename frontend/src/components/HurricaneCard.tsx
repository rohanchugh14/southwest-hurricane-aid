import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";

interface HurricaneDataProps {
    index: number,
    name: string,
    url: string,
    formed: string,
    image: string,
    caption: string,
    dissipated: string,
    category: string,
    highest_winds: string,
    lowest_pressure: string,
    deaths: string,
    damage: string,
    areas_affected: string,
    counties_mentioned: string,
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
                        to={`/Hurricanes/HurricaneInstances/${props.index}`}
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
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    >
                                        <b>Date: </b>
                                        {props.formed}
                                        </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    >
                                        <b>Wind Speed: </b>
                                        {props.highest_winds}
                                        </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    >
                                        <b>Fatalities: </b>
                                        {props.deaths}
                                        </Typography>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Link>
                </Tooltip>
            </Card>
        </div>
    );
}
