import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Link from '@mui/material/Link';
import CardMedia from "@mui/material/CardMedia";
import { Hurricane } from "../types";

type Props = {
    hurricane: Hurricane;
    // index: number;
};

export default function HurricaneCard({ hurricane }: Props) {
    return (
        <div style={{ width: "350px", height: "100%" }}>
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
                        href={`/Hurricanes/HurricaneInstances/${hurricane.id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <CardActionArea>
                            <CardMedia
                                style={{ height: 220 }}
                                image={hurricane.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5">
                                    {hurricane.name}
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
                                        {hurricane.category === -1
                                            ? "Tropical Depression"
                                            : hurricane.category === 0
                                            ? " Tropical Storm"
                                            : hurricane.category}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    >
                                        <b>Date: </b>
                                        {hurricane.formed.slice(0,17)}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    >
                                        <b>Wind Speed: </b>
                                        {hurricane.highest_winds}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        style={{
                                            marginTop: "5px",
                                        }}
                                    >
                                        <b>Fatalities: </b>
                                        {hurricane.deaths}
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
