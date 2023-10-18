import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Routes from "../Routes";
import { AidOrganization } from "../types";

const AidOrganizationInstances = () => {
    const name = useParams().instance;
    const pagesize = 20;

    const [org, setOrg] = useState<AidOrganization | null>(null);
    const index = parseInt(name ?? "1");
    const countyLink = "county";

    useEffect(() => {
        const getOrg = async (index: number) => {
            let res = await fetch(`${Routes.aidOrganizations}/${index}`, {
                method: "GET",
            });
            let resArray = await res.json();
            setOrg(resArray);
        };
        getOrg(index);
    }, [index]);

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
                    image={"img/logo192.png"}
                    title="organization"
                />
                <CardContent>
                    <Typography variant="h2">{org?.shelter_name}</Typography>
                    <Typography variant="body1">
                        <strong>Address: </strong>
                        {org?.address_1}, {org?.city} TX
                        <br />
                        <strong>County: </strong>
                        <Link to={`/Counties/CountyInstances/${org?.county.id}`}>
                            {org?.county.name}{" "}
                        </Link>
                        <br />
                        <b>Organization name: </b> {org?.org_organization_name}
                        <br />
                        <b>Phone: </b>{" "}
                        {org?.org_main_phone !== " "
                            ? org?.org_main_phone
                            : "Not listed"}
                    </Typography>
                    <Typography>
                        {" "}
                        <b> </b>{" "}
                    </Typography>
                    {/* <Link to = {"/Hurricanes/HurricaneInstances/" + ourOrg?.attributes.hurricane[0]}> 
                        {ourOrg?.hurricane[0]} 
                    </Link>
                    <Typography> <b> </b> </Typography>
                    <Link to = {"/Hurricanes/HurricaneInstances/" + ourOrg?.attributes.hurricane[1]}> 
                        {ourOrg?.hurricane[1]} <b> </b>
                    </Link> */}
                    <Typography>
                        {" "}
                        <b> </b>{" "}
                    </Typography>
                    <Link
                        to={`/Aid Organizations/${Math.ceil(index / pagesize)}`}
                        className="back-button"
                    >
                        Back{" "}
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default AidOrganizationInstances;
