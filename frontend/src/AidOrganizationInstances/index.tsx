import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AidOrganizationInstances = () => {
    const name = useParams().instance;
    const pagesize = 20

    const [ourOrg, setOrg] = useState({
        'id': 0,
        'shelter_name': "",
        'address_1': "",
        'city': "",
        'state': "",
        'county_parish': "",
        'zip': "",
        'ada_compliant': "",
        'wheelchair_accessible': "",
        'generator_onsite': "",
        'self_sufficient_electricity': "",
        'in_surge_slosh_area': "",
        'org_organization_name': "",
        'org_main_phone': "",
        'org_email': "",
        'score': 0,
        'in_100_yr_floodplain': "",
        'status': "",
        'longitude': 0.0,
        'latitude': 0.0
    })
    const index = parseInt(name?.toString() ?? "1")
    const countyLink = "county"
    
    useEffect(() => {
        const getOrg = async (index: number) => {
            let res = await fetch(`http://localhost:4000/api/aidorganizations/${index}`, {method: "GET"})
            let resArray = await res.json()
            setOrg(resArray)
          } 
        getOrg(index)
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
                    image={"logo192.png"}
                    title="organization"
                />
                <CardContent>
                    <Typography variant="h2">
                        {ourOrg?.shelter_name}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Address: </strong>
                        {ourOrg?.address_1},{" "}
                        {ourOrg?.city} TX
                        <br />
                        <strong>County: </strong>
                        <Link to={`/Counties/CountyInstances/${countyLink}`}>
                            {ourOrg?.county_parish}{" "}
                        </Link>
                        <br />
                        <b>Organization name: </b>{" "}
                        {ourOrg?.org_organization_name}
                        <br />
                        <b>Phone: </b>{" "}
                        {ourOrg?.org_main_phone !== " "
                            ? ourOrg?.org_main_phone
                            : "Not listed"}
                    </Typography>
                    <Typography> <b> </b> </Typography>
                    {/* <Link to = {"/Hurricanes/HurricaneInstances/" + ourOrg?.attributes.hurricane[0]}> 
                        {ourOrg?.hurricane[0]} 
                    </Link>
                    <Typography> <b> </b> </Typography>
                    <Link to = {"/Hurricanes/HurricaneInstances/" + ourOrg?.attributes.hurricane[1]}> 
                        {ourOrg?.hurricane[1]} <b> </b>
                    </Link> */}
                    <Typography> <b> </b> </Typography>
                    <Link to={`/Aid Organizations/${Math.ceil(index / pagesize)}`} className = "back-button">Back </Link>
                </CardContent>
            </Card>
        </div>
    );
};

export default AidOrganizationInstances;
