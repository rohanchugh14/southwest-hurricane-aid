import {
    Card,
    CardActionArea,
    CardContent,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";
import Link from '@mui/material/Link';
import { AidOrganization } from "../types";
import MapsComponent from "./MapsComponent";
import HighlightedText from "../utils/HighlightedText";
type Props = {
    searchTerm: string;
    aidOrganization: AidOrganization;
    imgUrl?: string;
};
const AidOrganizationCard = ({ searchTerm, aidOrganization, imgUrl }: Props) => {
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
                    href={`/Aid Organizations/AidOrganizationInstances/${aidOrganization.id}`}
                    style={{ textDecoration: "none" }}
                >
                    <CardActionArea>
                        <CardContent>
                            {/* <MapsComponent center={{ lat: aidOrganization.latitude, lng: aidOrganization.longitude }} zoom={10} /> */}
                            {/* TODO: UNCOMMENT ABOVE WHEN TURNING IN */}
                            <Typography gutterBottom variant="h5">
                                <HighlightedText searchTerm={searchTerm} text={aidOrganization.shelter_name} />
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
                                    <HighlightedText searchTerm={searchTerm} text={aidOrganization.address_1} />
                                    <HighlightedText searchTerm={searchTerm} text={aidOrganization.city} /> TX
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    style={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <b>County: </b>
                                    <HighlightedText searchTerm={searchTerm} text={aidOrganization.county?.name} />
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    style={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <b>Organization name: </b>{" "}
                                    <HighlightedText searchTerm={searchTerm} text={aidOrganization.org_organization_name ?? ""} />
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    style={{
                                        marginTop: "5px",
                                    }}
                                >
                                    <b>Score: </b>{" "}
                                    {aidOrganization.score ?? "Not rated"}
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
    shelter_name: "Name goes here",
    imgurl: "img/logo192.png",
    city: "City goes here",
    address: "Address goes here",
    county: "County goes here",
    organization_name: "Org name goes here",
    phone: "Not listed",
};

export default AidOrganizationCard;
