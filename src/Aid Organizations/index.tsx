import React from 'react'
import AidOrganizationCard from './AidOrganizationCard';
import aidOrganizationData from '../Data/aidorganizations_small.json'
import { Grid } from '@mui/material';

const AidOrganizations = () => {
  return (
    <Grid container spacing={5} style={{ padding: "60px 20px 20px 20px" }}>
      {aidOrganizationData.features.map((organization) => (
        <Grid item xs={12} sm={3} style={{ padding: "10px" }}>
          <AidOrganizationCard
            // image={hurricane.image}
            imgurl={organization.attributes.imgurl}
            name={organization.attributes.shelter_name}
            city={organization.attributes.city}
            address={organization.attributes.address_1}
            county={organization.attributes.county_parish}
            organization_name={organization.attributes.org_organization_name}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default AidOrganizations