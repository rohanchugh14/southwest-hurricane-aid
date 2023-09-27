import { Typography, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MemberCard from './MemberCard'


const About = () => {

  const [commits, setCommits] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);

  function getCommits() {
    //do the API call here
    var requestOptions = {
      method: 'GET',
    };

    fetch("https://gitlab.com/api/v4/projects/50653866/repository/commits?per_page=9999&private_token=glpat-77ZZEz4Fy1piNyhkwMqk", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setCommits(result);
      });
  }

  function getIssues() {


    var requestOptions = {
      method: 'GET',
    };

    fetch("https://gitlab.com/api/v4/projects/50653866/issues?per_page=9999&private_token=glpat-77ZZEz4Fy1piNyhkwMqk", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setIssues(result);
      });
  }

  function personIsAssignedToIssue(name: string, assignees: any[]) {
    for(var assignee of assignees) {
      if(name === assignee.name){
        return true
      }
    }
    return false
  }


  useEffect(() => {
    getCommits();
    getIssues();

  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px',
        paddingBottom: '0px'
      }}>

        <Typography variant="h3">About our project</Typography>

      </div>

      <div style={{ padding: "100px" }}>

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


          <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            <MemberCard
              name='Carolyn Stripling'
              imgurl='carolyn.jpg'
              commits={
                (commits.filter((commit) => commit.committer_name === "Carolyn Stripling")).length
              }
              issues={
                (issues.filter((issue) => personIsAssignedToIssue("Carolyn Stripling", issue.assignees))).length
              }
            />
          </Grid>


          <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            <MemberCard
              name='Eshitha Bangray'
              imgurl='eshitha.webp'
              commits={
                (commits.filter((commit) => commit.committer_name === "eshub1")).length
              }
              issues={
                (issues.filter((issue) => personIsAssignedToIssue("eshub1", issue.assignees))).length
              }
            />
          </Grid>


          <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            <MemberCard
              name='James Stewart'
              imgurl='james.webp'
              commits={
                (commits.filter((commit) => commit.committer_name === "James Aidan Stewart")).length
              }
              issues={
                (issues.filter((issue) => personIsAssignedToIssue("James Aidan Stewart", issue.assignees))).length
              }
            />
          </Grid>


          <Grid item xs={6} style={{ display: "flex", justifyContent: "center" }}>
            <MemberCard
              name='Nitish Bansal'
              imgurl='nitish.png'
              commits={
                (commits.filter((commit) => commit.committer_name === "Nitish Bansal")).length
              } 
              issues={
                (issues.filter((issue) => personIsAssignedToIssue("Nitish Bansal", issue.assignees))).length
              }
              />
          </Grid>


          <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <MemberCard
              name='Rohan Chugh'
              imgurl='rohan.webp'
              commits={
                (commits.filter((commit) => commit.committer_name === "rohanchugh14")).length
              }
              issues={
                (issues.filter((issue) => personIsAssignedToIssue("rohanchugh14", issue.assignees))).length
              } />
          </Grid>
        </Grid>
      </div>


      <div style={{ paddingLeft: "100px" }}>

        <Typography variant='body1'>
          <b>Total number of commits: </b> {commits.length} <br />

          <b>Total number of issues:</b> {issues.length} <br />

          <b>Total number of unit tests:</b> 0 <br />

          <br />

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

        <br /><br />


        <b>Link to Postman API: </b> TBD
      </div>
    </div>
  )
}

export default About