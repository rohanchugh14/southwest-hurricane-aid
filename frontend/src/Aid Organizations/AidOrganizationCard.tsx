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
import { AidOrganization } from "../types";
import MapsComponent from "./MapsComponent";
type Props = {
    aidOrganization: AidOrganization;
    imgUrl?: string;
};
const AidOrganizationCard = ({ aidOrganization, imgUrl }: Props) => {
    return (
        <Card
            sx={{
                width: 350,
                height: 500,
                boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
        >
            <Tooltip title="Click for More Info">
                <Link
                    to={`/Aid Organizations/AidOrganizationInstances/${aidOrganization.id}`}
                    style={{ textDecoration: "none" }}
                >
                    <CardActionArea>
                        <CardContent>
                            <MapsComponent center={{ lat: 30.2672, lng: -97.7431 }} zoom={10} />
                            <Typography gutterBottom variant="h5">
                                {aidOrganization.shelter_name}
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
                                    {aidOrganization.address_1},{" "}
                                    {aidOrganization.city} TX
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    style={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <b>County: </b>
                                    {aidOrganization.county.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    style={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <b>Organization name: </b>{" "}
                                    {aidOrganization.org_organization_name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    style={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <b>Phone: </b>{" "}
                                    {aidOrganization.org_main_phone !== " "
                                        ? aidOrganization.org_main_phone
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
    imgurl: "img/logo192.png",
    city: "City goes here",
    address: "Address goes here",
    county: "County goes here",
    organization_name: "Org name goes here",
    phone: "Not listed",
};

export default AidOrganizationCard;
