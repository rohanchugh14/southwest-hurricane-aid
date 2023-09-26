import { Typography, Grid } from '@mui/material'
import React from 'react'
import MemberCard from './MemberCard'

const About = () => {
  return (
    <div style={{margin: "10px"}}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        paddingBottom: '0px'
      }}>

        <Typography variant="h3">About our project</Typography>

      </div>

      <div style={{padding: "100px"}}>

        <Typography variant="subtitle1">

          <b>Southwest Hurricane Aid</b> is a site designed for those who live in areas at risk of hurricanes
          to find resources that can help them prepare and find relief. Its purpose is to help those living in at-risk areas on the Texas coast
          locate aid organizations, discover past hurricane data for their location, and find information related to hurricanes
          in the area that they live in.

        </Typography>

      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        <Typography variant="h3">Our Team</Typography>

      </div>

      <div>
      <Grid container spacing={10} padding={30} paddingTop={5} paddingBottom={5}>
        <Grid item xs={6} style={{display: "flex", justifyContent: "center"}}>
          <MemberCard name='Carolyn Stripling' imgurl='carolyn.jpg' />
        </Grid>
        <Grid item xs={6} style={{display: "flex", justifyContent: "center"}}>
          <MemberCard name='Eshitha Bangray' imgurl='eshitha.webp' />
        </Grid>
        <Grid item xs={6} style={{display: "flex", justifyContent: "center"}}>
          <MemberCard name='James Stewart' imgurl='james.webp'/>
        </Grid>
        <Grid item xs={6} style={{display: "flex", justifyContent: "center"}}>
          <MemberCard name='Nitish Bansal' imgurl='nitish.png'/>
        </Grid>
        <Grid item xs={12} style={{display: "flex", justifyContent: "center"}}>
          <MemberCard name='Rohan Chugh' imgurl='rohan.webp' />
        </Grid>
      </Grid>
      </div>


      <div style={{paddingLeft: "100px"}}>

        <Typography variant='body1'>
          <b>Total number of commits: </b> 0 <br/>

          <b>Total number of issues:</b> 0 <br/>

          <b>Total number of unit tests:</b> 0 <br/>

          <br/>

        </Typography>

        <b> Data Sources</b>

        <ul>
          <li><a href='https://www.weather.gov/documentation/services-web-api'>https://www.weather.gov/documentation/services-web-api</a></li>
          <li><a href='https://en.wikipedia.org/api/rest_v1/'>https://en.wikipedia.org/api/rest_v1/</a></li>
          <li><a href='https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::national-shelter-system-facilities/about'>https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::national-shelter-system-facilities/about</a></li>
          <li><a href='https://public.opendatasoft.com/explore/dataset/us-county-boundaries/table/?flg=en-us&disjunctive.statefp&disjunctive.countyfp&disjunctive.name&disjunctive.namelsad&disjunctive.stusab&disjunctive.state_name'>https://public.opendatasoft.com/explore/dataset/us-county-boundaries/table/?flg=en-us&disjunctive.statefp&disjunctive.countyfp&disjunctive.name&disjunctive.namelsad&disjunctive.stusab&disjunctive.state_name</a></li>
        </ul>

        <b>Tools used:</b>

        <ul>
          <li>Frontend: React, MaterialUI</li>
        </ul>


        <b>Link to GitLab repo: </b> <a href="https://gitlab.com/rohanchugh14/southwest-hurricane-aid">https://gitlab.com/rohanchugh14/southwest-hurricane-aid</a>

        <br/><br/>


        <b>Link to Postman API: </b> TBD
      </div>
    </div>
  )
}

export default About