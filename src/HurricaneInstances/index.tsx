import React, { useState } from "react";
import hurricaneData from "../Data/hurricane_data.json";
import { useParams } from "react-router-dom";



const HurricaneInstances = () => {
  const [name, setName] = useState(useParams().instance);
  console.log(name);
  // setName(useParams());
  const ourHurricane = hurricaneData.find((currObject) => {
    return currObject.Name == name;
  });
  console.log(ourHurricane)
  return (
    <>
      <h1> {name} </h1>
      <img src = {ourHurricane?.Image} alt = "no image avaliable" />
      <h6> {ourHurricane?.Image} </h6>
      <h1> {ourHurricane?.Category} </h1>
      <h1> {ourHurricane?.Date} </h1>
      <a href = "/Hurricanes" className = "back-button">Back </a>
    </>
  )
}

export default HurricaneInstances;