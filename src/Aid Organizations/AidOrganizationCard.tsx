import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const AidOrganizationCard = ( props: {
    name: string,
    imgurl: string,
    city: string,
    address: string,
    county: string,
    organization_name: string
  }) => {
  return (
    <Card sx={{ width: 300, height: 500 }}>
      <CardContent>
        <CardMedia
          component="img"
          style={{width: 300, height: 200}}
          image={props.imgurl}
          alt="member image" />
        <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
          {props.name}
        </Typography>
        <Typography variant='subtitle1'>
            {props.address}, {props.city} TX
            <br />
            {props.county} COUNTY
            <br />

            <b>Organization name: </b> {props.organization_name}
        </Typography>

        
        
      </CardContent>
    </Card>
  )
}

AidOrganizationCard.defaultProps = {
    name: "Name goes here",
    imgurl: "logo192.png",
    city: "City goes here",
    address: "Address goes here",
    county: "County goes here",
    organization_name: "Org name goes here"
}


export default AidOrganizationCard