import React from 'react'
import { useParams } from 'react-router-dom';
import aidOrganizationData from '../Data/aidorganizations_small.json'
import { Typography } from '@mui/material';



const AidOrganizationInstances = () => {

    const name = useParams().instance;
    const ourOrg = aidOrganizationData.features.find((currObject) => {
        return currObject.attributes.shelter_name === name;
    });
    console.log(ourOrg)
    return (
        <div>
            
            <Typography variant='h2'>{ourOrg?.attributes.shelter_name}</Typography>
            
            <img src={"/" + ourOrg?.attributes.imgurl} alt="hurricane" />

            <Typography variant='body1'>

                {ourOrg?.attributes.address_1}, {ourOrg?.attributes.city} TX

                <br/>

                {ourOrg?.attributes.county_parish} COUNTY 

                <br />

                <b>Organization name: </b> {ourOrg?.attributes.org_organization_name}

                <br />

                <b>Phone: </b> {ourOrg?.attributes.org_main_phone !== " " ? ourOrg?.attributes.org_main_phone : "Not listed"}


            </Typography>


            
            
            
        </div>
    )
}

export default AidOrganizationInstances