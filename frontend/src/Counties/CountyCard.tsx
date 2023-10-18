import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import { County } from "../types";

type Props = {
    county: County;
};
const CountyCard = ({ county}: Props) => {
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
                    to={`/Counties/CountyInstances/${county.id}`}
                    style={{ textDecoration: "none" }}
                >
                    <CardActionArea>
                        <CardContent>
                            <CardMedia
                                component="img"
                                image={county.map}
                                width="10%"
                                height="10%"
                                alt="member image"
                            />

                            <Typography
                                variant="h5"
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                {county.name}
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                <b>Population: </b> {county.population}
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                <b>Land Area: </b> {county.area}
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                <b>Est: </b> {county.est}
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
    imgurl: "img/logo192.png",
    population: "0",
    region: "None",
    precipitation: "0",
    landarea: "0",
};

export default CountyCard;
