import { Image } from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const CountyCard = (props:
  {
    name: string,
    imgurl: string,
    bio: string,
    responsibilities: string,
    commits: number,
    issues: number,
    population: string,
    landarea: string,
    unittests: number
  }) => {
  return (
    <Card sx={{ width: 300 }}>
      <CardContent>
        <CardMedia
          component="img"
          image={props.imgurl}
          width="10%"
          height="10%"
          alt="member image" />
          

        <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
          {props.name}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          <b>Population: </b> {props.population}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          <b>Land Area: </b> {props.landarea}
        </Typography>


      </CardContent>
    </Card>

  )
}


CountyCard.defaultProps = {
  name: "Firstname Lastname",
  imgurl: "logo192.png",
  bio: "bio goes here",
  responsibilities: "responsibilities go here",
  commits: 0,
  issues: 0,
  unittests: 0,
  population: "0",
  landarea: "0"
}

export default CountyCard