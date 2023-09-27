import React from "react";
import { useParams } from "react-router-dom";
import aidOrganizationData from "../Data/aidorganizations_small.json";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AidOrganizationInstances = () => {
    const name = useParams().instance;
    const ourOrg = aidOrganizationData.features.find((currObject) => {
        return currObject.attributes.shelter_name === name;
    });
    const countyLink =
        ourOrg?.attributes.county_parish
            .substring(0, 1)
            .concat(
                ourOrg?.attributes.county_parish.toLowerCase().substring(1)
            ) + " County";
    return (
        <div>
            <Card
                sx={{
                    margin: "auto",
                    width: "50%",
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                <CardMedia
                    sx={{ height: 300, width: "100%" }}
                    image={"/" + ourOrg?.attributes.imgurl}
                    title="organization"
                />
                <CardContent>
                    <Typography variant="h2">
                        {ourOrg?.attributes.shelter_name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Address: </strong>
                        {ourOrg?.attributes.address_1},{" "}
                        {ourOrg?.attributes.city} TX
                        <br />
                        <strong>County: </strong>
                        <Link to={`/Counties/CountyInstances/${countyLink}`}>
                            {ourOrg?.attributes.county_parish}{" "}
                        </Link>
                        <br />
                        <b>Organization name: </b>{" "}
                        {ourOrg?.attributes.org_organization_name}
                        <br />
                        <b>Phone: </b>{" "}
                        {ourOrg?.attributes.org_main_phone !== " "
                            ? ourOrg?.attributes.org_main_phone
                            : "Not listed"}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default AidOrganizationInstances;
