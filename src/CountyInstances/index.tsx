import React  from "react";
import countyData from "../Data/county_data.json";
import { Link, useParams } from "react-router-dom";



const CountyInstances = () => {
  const name = useParams().instance;
  const ourCounty = countyData.find((currObject) => {
    return currObject.Name === name;
  });
  console.log(ourCounty)
  return (
    <>
      <h1> {name} </h1>
      <img src = {"/" + ourCounty?.Image} alt = "no image" />
      <h6> {"Image Link: " + ourCounty?.Image} </h6>
      <h1> {"Population: " + ourCounty?.Population} </h1>
      <h1> {"Land Area: " + ourCounty?.Land_Area + " sq. miles"} </h1>
      <Link to="/Counties" className = "back-button">Back </Link>
    </>
  )
}

export default CountyInstances;