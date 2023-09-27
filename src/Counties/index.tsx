import { Typography, Grid } from '@mui/material'
import React from 'react'
import CountyCard from './CountyCard'

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

        <Typography variant="h3">Texas Counties</Typography>

      </div>

      <div style={{padding: "100px"}}>

        <Typography variant="subtitle1">

          <b>Southwest Hurricane Aid</b> Below is a list of all of the counties in Texas 
          along with a few attributes of each county including attributes such as One,
          Two, Three, Four, Five. 

        </Typography>

      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

      </div>

      <div>
      <Grid container spacing={10} padding={30} paddingTop={5} paddingBottom={5}>
        <Grid item xs={4} style={{display: "flex", justifyContent: "center"}}>
          <CountyCard name='Anderson County' imgurl='county-images/anderson-county-img.png' population = '58,064'
          landarea = '1,071 sq mi' region = 'East Texas' precipitation={46.38}/>
        </Grid>

        <Grid item xs={4} style={{display: "flex", justifyContent: "center"}}>
          <CountyCard name='Andrews County' imgurl='county-images/andrews-county-img.png' population = '18,334'
          landarea = '1,501 sq mi' region = 'West Texas' precipitation={15.15}/>
        </Grid>

        <Grid item xs={4} style={{display: "flex", justifyContent: "center"}}>
          <CountyCard name='Angelina County' imgurl='county-images/angelina-county-img.png' population = '87,101'
          landarea = '802 sq mi' region = 'East Texas' precipitation={46.62}/>
        </Grid>

        <Grid item xs={4} style={{display: "flex", justifyContent: "center"}}>
          <CountyCard name='Aransas County' imgurl='county-images/aransas-county-img.png' population = '24,944'
          landarea = '252 sq mi' region = 'South Texas' precipitation={35.96}/>
        </Grid>

        <Grid item xs={4} style={{display: "flex", justifyContent: "center"}}>
          <CountyCard name='Archer County' imgurl='county-images/archer-county-img.png' population = '8,835'
          landarea = '910 sq mi' region = 'North Texas' precipitation={29.78} />
        </Grid>

      </Grid>
      </div>


      <div style={{paddingLeft: "100px"}}>


        
      </div>
    </div>
  )
}

export default About