import React  from "react";
import countyData from "../Data/county_data.json";
import { useParams } from "react-router-dom";



const CountyInstances = () => {
  const name = useParams().instance;
  const ourCounty = countyData.find((currObject) => {
    return currObject.Name === name;
  });
  console.log(ourCounty)
  return (
    <>
      <h1> {name} </h1>
      <img src = {ourCounty?.Image} alt = "hurricane" />
      <h6> {ourCounty?.Image} </h6>
      <h1> {ourCounty?.Population} </h1>
      <h1> {ourCounty?.Land_Area} </h1>
      <a href = "/Counties" className = "back-button">Back </a>
    </>
  )
}

export default CountyInstances;