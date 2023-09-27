import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AidOrganizationCard = (props: {
    name: string;
    imgurl: string;
    city: string;
    address: string;
    county: string;
    organization_name: string;
    phone: string;
}) => {
    return (
        <Card
            sx={{
                width: 350,
                boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
        >
            <Tooltip title="Click for More Info">
                <Link
                    to={`AidOrganizationInstances/${props.name}`}
                    style={{ textDecoration: "none" }}
                >
                    <CardActionArea>
                        <CardContent>
                            <CardMedia
                                style={{height: 200 }}
                                image={props.imgurl}
                            />
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
                                    <b>Address: </b>
                                    {props.address}, {props.city} TX
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    style={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <b>County: </b>
                                    {props.county}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    style={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <b>Organization name: </b>{" "}
                                    {props.organization_name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    style={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <b>Phone: </b>{" "}
                                    {props.phone !== " "
                                        ? props.phone
                                        : "Not listed"}
                                </Typography>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Tooltip>
        </Card>
    );
};

AidOrganizationCard.defaultProps = {
    name: "Name goes here",
    imgurl: "logo192.png",
    city: "City goes here",
    address: "Address goes here",
    county: "County goes here",
    organization_name: "Org name goes here",
    phone: "Not listed",
};

export default AidOrganizationCard;
