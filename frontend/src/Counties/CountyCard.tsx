import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Link from '@mui/material/Link';
import { County } from "../types";
import HighlightedText from "../utils/HighlightedText";

type Props = {
    searchTerm: string;
    county: County;
};

const CountyCard = ({ searchTerm, county}: Props) => {
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
                    href={`/Counties/CountyInstances/${county.id}`}
                    sx={{ textDecoration: "none" }}
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
                                <HighlightedText searchTerm={searchTerm} text={county.name} />
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                <b>Population: </b> <HighlightedText searchTerm={searchTerm} text={county.population.toString()} />
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                <b>Land Area: </b> <HighlightedText searchTerm={searchTerm} text={county.area.toString()} />
                            </Typography>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                <b>Est: </b> <HighlightedText searchTerm={searchTerm} text={county.est.toString()} />
                            </Typography>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                style={{
                                    marginTop: "5px",
                                }}
                            >
                                <b>County Seat: </b> <HighlightedText searchTerm={searchTerm} text={county.name} />
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
