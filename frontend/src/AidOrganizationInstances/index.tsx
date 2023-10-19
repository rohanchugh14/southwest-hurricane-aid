import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Routes from "../Routes";
import { AidOrganization } from "../types";
import MapsComponent from "../Aid Organizations/MapsComponent";

const AidOrganizationInstances = () => {
  const name = useParams().instance;
  const pagesize = 20;

  const [org, setOrg] = useState<AidOrganization | null>(null);
  const index = parseInt(name ?? "1");

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
        <MapsComponent
          center={{
            lat: (org) ? org.latitude : 29.7604,
            lng: (org) ? org.longitude : -95.3698,
          }}
          zoom={10}
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
                        <b>Organization name: </b> {org?.org_organization_name ?? org?.shelter_name}
                        <br />
                        <b>Score: </b> {org?.score ?? "Not rated"}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <b>Hurricanes: </b>{" "}
                        <Grid>
                            {org?.hurricanes?.map((h) => (
                            <Link to={`/Hurricanes/HurricaneInstances/${h.id}`}>
                                <Button color="primary">
                                    {h.name}
                                </Button>
                            </Link>
                            ))}
                        </Grid>
                    </Typography>
                    <Link to={`/Aid Organizations/${Math.ceil(index / pagesize)}`}>
                    <Button
                        style={{ marginTop: "15px" }}
                        className="back-button"
                        variant="contained"
                    >
                        Back{" "}
                    </Button>
                </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AidOrganizationInstances;
