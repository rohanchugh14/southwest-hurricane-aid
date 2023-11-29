import * as d3 from "d3";
import Routes from "./Routes";
import { AidOrganization, County, Hurricane } from "./types";
import { useState, useEffect } from "react";

export default function LinePlot({
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20
}) {


  const [x, setX] = useState([])
  const [y, setY] = useState([])

  useEffect(() => {

    const getHurricanes = async () => {
      const link = `${Routes.HOST}/api/aid_organizations?per_page=9999`
      console.log(link)
      let res = await fetch(link, {
        method: "GET",
      });
      let resArray = await res.json();

      const data = resArray["aid_organizations"].map((org: AidOrganization) => ({
        "x": org.latitude,
        "y": org.longitude
      }))


      console.log(data)
    }

    getHurricanes();


  }, [])


  return (
    <svg style={{ backgroundColor: "yellow" }} width={width} height={height}>
      <g fill="white" stroke="currentColor" stroke-width="1.5">
        {x.map((xi, i) => (<circle key={i} cx={x[i]} cy={y[i]} r="2.5" />))}
      </g>
    </svg>
  );


}


