import React from 'react'
import { useParams } from 'react-router-dom';
import aidOrganizationData from '../Data/aidorganizations_small.json'
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";



const AidOrganizationInstances = () => {

    const name = useParams().instance;
    const ourOrg = aidOrganizationData.features.find((currObject) => {
        return currObject.attributes.shelter_name === name;
    });
    const countyLink = ourOrg?.attributes.county_parish.substring(0,1).concat(ourOrg?.attributes.county_parish.toLowerCase().substring(1)) + " County";
    return (
        <div>
            
            <Typography variant='h2'>{ourOrg?.attributes.shelter_name}</Typography>
            
            <img src={"/" + ourOrg?.attributes.imgurl} alt="hurricane" />

            <Typography variant='body1'>

                {ourOrg?.attributes.address_1}, {ourOrg?.attributes.city} TX

                <br/>

                {ourOrg?.attributes.county_parish} COUNTY 
                <li key={ourOrg?.attributes.county_parish}>
                    <Link to = {`../../CountyInstances/${countyLink}`}>{ourOrg?.attributes.county_parish} </Link>
                </li>

                <br />

                <b>Organization name: </b> {ourOrg?.attributes.org_organization_name}


            </Typography>


            
            
            
        </div>
    )
}

export default AidOrganizationInstances