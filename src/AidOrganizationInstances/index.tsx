import React from 'react'
import { useParams } from 'react-router-dom';
import aidOrganizationData from '../Data/aidorganizations_small.json'
import { Typography } from '@mui/material';



const AidOrganizationInstances = () => {

    const name = useParams().instance;
    const ourHurricane = aidOrganizationData.features.find((currObject) => {
        return currObject.attributes.shelter_name === name;
    });
    console.log(ourHurricane)
    return (
        <div>
            
            <Typography variant='h2'>{ourHurricane?.attributes.shelter_name}</Typography>
            
            <img src={"/" + ourHurricane?.attributes.imgurl} alt="hurricane" />

            <Typography variant='body1'>

                {ourHurricane?.attributes.address_1}, {ourHurricane?.attributes.city} TX

                <br/>

                {ourHurricane?.attributes.county_parish} COUNTY 

                <br />

                <b>Organization name: </b> {ourHurricane?.attributes.org_organization_name}


            </Typography>


            
            
            
        </div>
    )
}

export default AidOrganizationInstances