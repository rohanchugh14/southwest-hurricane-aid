import React, {useState, useEffect}  from "react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Routes from "../Routes";



const CountyInstances = () => {
  const name = useParams().instance;
  const pagesize = 20

  const [ourCounty, setCounty] = useState({
    'id': 0,
    'name': "",
    'est': "",
    'population': "",
    'area': "",
    'map': "",
  })
  const index = parseInt(name?.toString() ?? "1")

   

  useEffect(() => {
    const getCounty = async (index: number) => {
      let res = await fetch(`${Routes.counties}/${index}`, {method: "GET"})
      let resArray = await res.json()
      setCounty(resArray)
    }
    getCounty(index)
  }, [index]);


  return (
    /*<>
      <h1> {name} </h1>
      <img src = {"/" + ourCounty?.Image} alt = "no image" />
      <h6> {"Image Link: " + ourCounty?.Image} </h6>
      <h1> {"Population: " + ourCounty?.Population} </h1>
      <h1> {"Land Area: " + ourCounty?.Land_Area + " sq. miles"} </h1>
      <Link to="/Counties" className = "back-button">Back </Link>
    </> */ 

    <Card sx={{ margin: "auto" , width: "50%" }}>
      <CardContent>
        <Typography variant="h1" component="div" style={{ textAlign: "center" }}>
          {ourCounty?.name}
        </Typography>
        <CardMedia
          sx={{ margin: "auto" , width: "50%" }}
          component="img"
          image={ourCounty?.map}
          alt="member image" />
        <Typography variant="body1" color="text.secondary">
          <b>Population: </b> {ourCounty?.population}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <b>Land area: </b> {ourCounty?.area} <b> sq. miles</b>
        </Typography>
        {/* <Link to={`/Aid Organizations/AidOrganizationInstances/${ourCounty?.aid}`}>
          {ourCounty?.aid}{" "}
        </Link> */}
        <Typography> <b> </b> </Typography>
        {/* <Link to = {"/Hurricanes/HurricaneInstances/" + ourCounty?.Hurricane[0]}> 
          {ourCounty?.Hurricane[0]} 
        </Link> */}
        <Typography> <b> </b> </Typography>
        {/* <Link to = {"/Hurricanes/HurricaneInstances/" + ourCounty?.Hurricane[1]}> 
          {ourCounty?.Hurricane[1]} <b> </b>
        </Link> */}
        <Typography> <b> </b> </Typography>
        <Link to={`/Counties/${Math.ceil(index / pagesize)}`} className = "back-button">Back </Link>
    </CardContent>
  </Card>

  )
}

export default CountyInstances;