import React from "react";
import hurricaneData from "../Data/hurricane_data.json";
import { Link, useParams } from "react-router-dom";



const HurricaneInstances = () => {
  const name = useParams().instance;
  const ourHurricane = hurricaneData.find((currObject) => {
    return currObject.Name === name;
  });
  console.log(ourHurricane)
  return (
    <>
      <h1> {name} </h1>
      <img src = {ourHurricane?.Image} alt="hurricane"/>
      <h6> {ourHurricane?.Image} </h6>
      <h1> {ourHurricane?.Category} </h1>
      <h1> {ourHurricane?.Date} </h1>
      <Link to = "/Hurricanes" className = "back-button">Back </Link>
    </>
  )
}

export default HurricaneInstances;