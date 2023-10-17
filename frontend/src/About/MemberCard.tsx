import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const MemberCard = (props:
  {
    name: string,
    imgurl: string,
    bio: string,
    responsibilities: string,
    commits: number,
    issues: number,
    unittests: number
  }) => {
  return (
    <Card sx={{ width: 450 }}>
      <CardContent>
        <CardMedia
          component="img"
          image={`img/${props.imgurl}`}
          alt="member image" />
        <Typography variant="h5" component="div" style={{ textAlign: "center" }}>
          {props.name}
        </Typography>
        <Typography variant='body1'>{props.bio}</Typography>
        <Typography variant="body1" color="text.secondary">
          <b>Responsibilities: </b> {props.responsibilities}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <b>Commits: </b> {props.commits}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <b>Issues: </b> {props.issues}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <b>Unit tests: </b> {props.unittests}
        </Typography>
      </CardContent>
    </Card>

  )
}


MemberCard.defaultProps = {
  name: "Firstname Lastname",
  imgurl: "img/logo192.png",
  bio: "bio goes here",
  responsibilities: "responsibilities go here",
  commits: 0,
  issues: 0,
  unittests: 0
}

export default MemberCard