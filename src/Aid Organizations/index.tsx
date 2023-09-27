import React from "react";
import AidOrganizationCard from "./AidOrganizationCard";
import aidOrganizationData from "../Data/aidorganizations_small.json";
import { Grid, Typography } from "@mui/material";

const AidOrganizations = () => {
    return (
        <div style={{ margin: "10px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "50px",
                    paddingBottom: "0px",
                }}
            >
                <Typography variant="h3">Aid Organizations</Typography>
                <div style={{ padding: "50px" }}>
                    <Typography variant="subtitle1">
                        <b>Southwest Hurricane Aid</b> Below is a list of aid
                        organization locations that helped Texas during
                        hurricanes along with a few attributes of each hurricane
                        including attributes such as their name, address,
                        county, organization, and phone number.
                    </Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {aidOrganizationData.features.map((organization) => (
                        <Grid item xs={12} sm={3} style={{padding: "10px"}}>
                            <AidOrganizationCard
                                imgurl={organization.attributes.imgurl}
                                name={organization.attributes.shelter_name}
                                city={organization.attributes.city}
                                address={organization.attributes.address_1}
                                county={organization.attributes.county_parish}
                                organization_name={
                                    organization.attributes
                                        .org_organization_name
                                }
                            />
                        </Grid>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AidOrganizations;
