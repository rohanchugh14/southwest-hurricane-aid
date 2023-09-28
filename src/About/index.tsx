import { Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import MemberCard from "./MemberCard";

const About = () => {
  const [commits, setCommits] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);

  function getCommits() {
    //do the API call here
    var requestOptions = {
      method: "GET",
    };

    fetch(
      "https://gitlab.com/api/v4/projects/50653866/repository/commits?per_page=9999&private_token=glpat-77ZZEz4Fy1piNyhkwMqk",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log({ commits: result });
        setCommits(result);
      });
  }

  function getIssues() {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      "https://gitlab.com/api/v4/projects/50653866/issues?per_page=9999&private_token=glpat-77ZZEz4Fy1piNyhkwMqk",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log({ issues: result });
        setIssues(result);
      });
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
        <Typography variant="h3">About our project</Typography>
      </div>

      <div style={{ padding: "100px" }}>
        <Typography variant="subtitle1">
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
          padding={30}
          paddingTop={5}
          paddingBottom={5}
        >
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "center" }}
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
            />
          </Grid>

          <Grid
            item
            xs={4}
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
            />
          </Grid>

          <Grid
            item
            xs={4}
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
            />
          </Grid>

          <Grid
            item
            xs={4}
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
            />
          </Grid>

          <Grid
            item
            xs={4}
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
            />
          </Grid>
        </Grid>
      </div>

      <div style={{ paddingLeft: "100px" }}>
        <Typography variant="body1">
          <b>Total number of commits: </b> {commits.length} <br />
          <b>Total number of issues:</b> {issues.length} <br />
          <b>Total number of unit tests:</b> 0 <br />
          <br />
        </Typography>
        <b> Data Sources</b>
        <ul>
          <li>
            <a href="https://www.weather.gov/documentation/services-web-api">
              https://www.weather.gov/documentation/services-web-api
            </a>
          </li>
          <li>
            <a href="https://en.wikipedia.org/api/rest_v1/">
              https://en.wikipedia.org/api/rest_v1/
            </a>
          </li>
          <li>
            <a href="https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::national-shelter-system-facilities/about">
              https://hifld-geoplatform.opendata.arcgis.com/datasets/geoplatform::national-shelter-system-facilities/about
            </a>
          </li>
          <li>
            <a href="https://public.opendatasoft.com/explore/dataset/us-county-boundaries/table/?flg=en-us&disjunctive.statefp&disjunctive.countyfp&disjunctive.name&disjunctive.namelsad&disjunctive.stusab&disjunctive.state_name">
              https://public.opendatasoft.com/explore/dataset/us-county-boundaries/table/?flg=en-us&disjunctive.statefp&disjunctive.countyfp&disjunctive.name&disjunctive.namelsad&disjunctive.stusab&disjunctive.state_name
            </a>
          </li>
        </ul>
        <b>Tools used:</b>
        <ul>
          <li>Frontend: React, MaterialUI</li>
        </ul>
        <b>Link to GitLab repo: </b>{" "}
        <a href="https://gitlab.com/rohanchugh14/southwest-hurricane-aid">
          https://gitlab.com/rohanchugh14/southwest-hurricane-aid
        </a>
        <br />
        <br />
        <b>Link to Postman API: </b>{" "}
        <a href="https://documenter.getpostman.com/view/18568319/2s9YJZ3PeF">
          https://documenter.getpostman.com/view/18568319/2s9YJZ3PeF
        </a>
      </div>
    </div>
  );
};

export default About;
