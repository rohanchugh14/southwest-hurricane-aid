import { Typography, Grid, Button, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import LinePlot from "../Our Visualizations/Graph2";
import ScatterPlot from "../Our Visualizations/county_visual";
import VisPieChart from "../Our Visualizations/pie";


const About = () => {
  const [commits, setCommits] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);

  const getCommits = async () => {
    var requestOptions = {
      method: "GET",
    };
    let page = 1
    let res = await fetch(`https://gitlab.com/api/v4/projects/50653866/repository/commits?per_page=100&page=${page}&private_token=glpat-77ZZEz4Fy1piNyhkwMqk`, requestOptions)
    let resArray = await res.json()
    let allCommits = []
    while(resArray.length > 0) {
      allCommits.push(...resArray)
      page++
      res = await fetch(`https://gitlab.com/api/v4/projects/50653866/repository/commits?per_page=100&page=${page}&private_token=glpat-77ZZEz4Fy1piNyhkwMqk`, requestOptions)
      resArray = await res.json()
    }   
    setCommits(allCommits);  
   
  }

  const getIssues = async () => {
    var requestOptions = {
      method: "GET",
    };
    let page = 1
    let res = await fetch(
      `https://gitlab.com/api/v4/projects/50653866/issues?per_page=100&page=${page}&private_token=glpat-77ZZEz4Fy1piNyhkwMqk`,
      requestOptions
    )
    let resArray = await res.json()
    let allIssues = []
    while(resArray.length > 0) {
      allIssues.push(...resArray)
      page++
      res = await fetch(`https://gitlab.com/api/v4/projects/50653866/issues?per_page=100&page=${page}&private_token=glpat-77ZZEz4Fy1piNyhkwMqk`, requestOptions)
      resArray = await res.json()
    }
    setIssues(allIssues)
  }

  function personIsAssignedToIssue(name: string, assignees: any[]) {
    for (var assignee of assignees) {
      if (name === assignee.name) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    getCommits();
    getIssues();
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "50px",
          paddingBottom: "0px",
        }}
      >
        <Typography variant="h3" textAlign={"center"}>About our project</Typography>
      </div>

      <div style={{ padding: "100px" }}>
        <Typography variant="subtitle1" textAlign={"center"}>
          <b>Southwest Hurricane Aid</b> is a site designed for those who live
          in areas at risk of hurricanes to find resources that can help them
          prepare and find relief. Its purpose is to help those living in
          at-risk areas on the Texas coast locate aid organizations, discover
          past hurricane data for their location, and find information related
          to hurricanes in the area that they live in.
        </Typography>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3">Our Team</Typography>
      </div>

      <div>
        <Grid
          container
          spacing={10}
          paddingTop={5}
          paddingBottom={5}
          justifyContent={"center"}
        >
          <Grid
            item style={{ display: "flex", justifyContent: "center" }}
          >
            <MemberCard
              name='Carolyn Stripling'
              imgurl='carolyn.png'
              bio="Hi! I'm a senior at UT Austin majoring in computer science. I like frontend and mobile development!"
              responsibilities="My responsibilities are mostly on the frontend, but I help with the backend when it's needed."
              commits={
                commits.filter(
                  (commit) => commit.committer_name === "Carolyn Stripling"
                ).length
              }
              issues={
                issues.filter((issue) =>
                  personIsAssignedToIssue("Carolyn Stripling", issue.assignees)
                ).length
              }
              unittests={10}
            />
          </Grid>

          <Grid
            item
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MemberCard
              name="Eshitha Bangray"
              imgurl="eshitha.jpg"
              bio="Hey! I am a junior CS student at UT Austin interested in Frontend development. I enjoy dancing, cooking, and watching netflix in my free time :)"
              responsibilities="My responsibilities are to focus on the frontend of the application and to help with the backend when needed."
              commits={
                commits.filter(
                  (commit) =>
                    commit.committer_name === "eshub1" ||
                    commit.committer_email === "eshitha.bangray@gmail.com"
                ).length
              }
              issues={
                issues.filter((issue) =>
                  personIsAssignedToIssue("eshub1", issue.assignees)
                ).length
              }
              unittests={12}
            />
          </Grid>

          <Grid
            item
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MemberCard
              name="James Stewart"
              imgurl="james.png"
              bio="Hi, I'm a senior Computer Science and French major at UT Austin. This is the first website I've worked on."
              responsibilities="My responsibilities include working on the backend of the site and helping out occasionally with the frontend."
              commits={
                commits.filter(
                  (commit) =>
                    commit.committer_name === "James Aidan Stewart" ||
                    commit.committer_email === "jastew15@gmail.com"
                ).length
              }
              issues={
                issues.filter((issue) =>
                  personIsAssignedToIssue(
                    "James Aidan Stewart",
                    issue.assignees
                  )
                ).length
              }
              unittests={10}
            />
          </Grid>

          <Grid
            item
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MemberCard
              name="Nitish Bansal"
              imgurl="nitish.png"
              bio="Hi! I am a Computer Science major in the Turing Scholars program. In the past, I’ve interned as a full-stack software engineer, and I am interested in quantitative finance. In my free time, you can find me eating chocolate, drinking smoothies, or playing basketball."
              responsibilities="My responsibilities encompass both the backend and frontend of the website. As a versatile team member, I frequently contribute to different parts of the project."
              commits={
                commits.filter(
                  (commit) => commit.committer_name === "Nitish-Bansal"
                ).length +
                commits.filter(
                  (commit) => commit.committer_name === "Nitish Bansal"
                ).length
              }
              issues={
                issues.filter((issue) =>
                  personIsAssignedToIssue("Nitish Bansal", issue.assignees)
                ).length
              }
              unittests={10}
            />
          </Grid>

          <Grid
            item
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MemberCard
              name="Rohan Chugh"
              imgurl="rohan.png"
              bio="Hi! I'm a senior at UT Austin studying Computer Science! I am interested in full-stack development and machine learning, and I enjoy playing tennis and watching movies in my free time :)"
              responsibilities="My responsibilities are to focus on giving a helping hand wherever it is needed and being a flexible team member that will work all over the application."
              commits={
                commits.filter(
                  (commit) =>
                    commit.committer_name === "rohanchugh14" ||
                    commit.committer_email === "rohanchugh14@gmail.com"
                ).length
              }
              issues={
                issues.filter((issue) =>
                  personIsAssignedToIssue("rohanchugh14", issue.assignees)
                ).length
              }
              unittests={10}
            />
          </Grid>
        </Grid>
      </div>

    {/*------------------------------------------ button changes--------------------------------------------- */ }      
      <div style={{ margin: "10px" }}>
      {/* ... (previous code remains unchanged) */}
      <div style={{ paddingLeft: "100px" }}>
        <Typography variant="body1">
          <b>Total number of commits: </b> {commits.length} <br />
          <b>Total number of issues:</b> {issues.length} <br />
          <b>Total number of unit tests:</b> 0 <br />
          <br />
        </Typography>
        
        <Typography variant="body1">
          <b>Explanation of the interesting result of integrating disparate data: </b>  Some interesting things we found while integrating this data was 
          that a lot of the counties that are in Northern Texas, and therefore away from the coast, had very few, if any, aid organizations 
          and hurricanes that affected it. Another interesting way that we were able to integrate the data was by connecting hurricanes 
          to aid organization via the Counties tables as there was no direct connection between them otherwise. This was essentially the
          same as doing a search for nearby aid organizations, but without having to perform that search for every single county that the hurricane was in, 
          and instead we used the data we already had.
        </Typography>
    

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <b>Data Sources</b>
        <br />
        <Button variant="contained" style={{ width: '70%', marginBottom: '20px' }} 
        href="https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::national-shelter-system-facilities/about">
          Aid Organizations API
        </Button>
        <Button variant="contained" style={{  width: '70%', marginBottom: '20px' }} 
        href="https://en.wikipedia.org/api/rest_v1/">
          Wikipedia API
        </Button>
        
        <br />
        <b>Link to GitLab repo </b>
         <br />
        <Button variant="contained" style={{ width: '70%', marginBottom: '20px' }} 
        href="https://gitlab.com/rohanchugh14/southwest-hurricane-aid">
          GitLab Repo
        </Button>
        
        <br />
        <b>Link to Postman API: </b>
        <br />
        <Button variant="contained" style={{ width: '70%', marginBottom: '20px' }} 
        href="https://documenter.getpostman.com/view/18568319/2s9YR9YsEf">
          Postman API
        </Button>
        <Button variant="contained" style={{  width: '70%', marginBottom: '20px' }}
        href="https://www.postman.com/material-pilot-15383947/workspace/southwest-hurricane-aid/collection/18568319-9b3b1a6a-ba7d-439a-aed3-4ce06860e4e0?action=share&creator=18568319"
        >
          Postman Collection (with tests)
        </Button>
      </div>




        <b>Tools used:</b>
        <ul>
          Frontend
        </ul>

        <Paper style={{  padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <img src="img/react-logo.png" alt="React Logo" style={{ width: '100px', height: 'auto' }} />
              <p>React</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="img/materialUI-logo.png" alt="MaterialUI Logo" style={{ width: '100px', height: 'auto' }} />
              <p>MaterialUI</p>
            </div>
          </div>
        </Paper>

        <ul>
          Backend
        </ul>


        <Paper style={{ padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <img src="img/flask-logo.png" alt="Flask Logo" style={{ width: '100px', height: 'auto' }} />
              <p>Flask</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="img/sqla-logo.png" alt="SQLAlchemy Logo" style={{ width: '100px', height: 'auto' }} />
              <p>SQLAlchemy</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="img/adminer-logo.png" alt="Adminer Logo" style={{ width: '100px', height: 'auto' }} />
              <p>Adminer</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="img/postgreSQL-logo.png" alt="PostgreSQL Logo" style={{ width: '100px', height: 'auto' }} />
              <p>PostgreSQL</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="img/docker-logo.webp" alt="Docker Logo" style={{ width: '100px', height: 'auto' }} />
              <p>Docker</p>
            </div>
          </div>
        </Paper>


        <ul>
          Testing
        </ul>
        

        <Paper style={{  padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <img src="img/selenium-logo.png" alt="Selenium Logo" style={{ width: '100px', height: 'auto' }} />
              <p>Selenium</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="img/jest-logo.avif" alt="Jest Logo" style={{ width: '100px', height: 'auto' }} />
              <p>Jest</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="img/unittest-logo.jpg" alt="UnitTest Logo" style={{ width: '100px', height: 'auto' }} />
              <p>UnitTest</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <img src="img/postman-logo.png" alt="Postman Logo" style={{ width: '100px', height: 'auto' }} />
              <p>Postman</p>
            </div>
          </div>
        </Paper>

        
        
      </div>
    </div>




    {/*------------------------------------------ button changes--------------------------------------------- */ }   
    </div>
  );
};

export default About;
