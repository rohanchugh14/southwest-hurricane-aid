import React from "react";
import Routes from "../Routes";
import { AidOrganization, County, Hurricane } from "../types";
import { useState, useEffect, PureComponent } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Paper, Typography } from "@mui/material";


const LinePlot = () => {

  const [data, setData] = useState([])

  useEffect(() => {

    const getHurricanes = async () => {
      const link = `${Routes.HOST}/api/aid_organizations?per_page=9999`
      console.log(link)
      let res = await fetch(link, {
        method: "GET",
      });
      let resArray = await res.json();

      var data = resArray["aid_organizations"].map((org: AidOrganization) => ({
        "x": org.longitude,
        "y": org.latitude
      }))

      data = data.filter((point: any) => point["y"] > 24.0);

      console.log(data)
      setData(data);
    }

    getHurricanes();


  }, [])

  return (
    <ResponsiveContainer width="100%" height={1200} style={{backgroundColor: "white"}}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="x" name="longitude" unit="deg" domain={[-100.0, -92.0]} />
            <YAxis type="number" dataKey="y" name="latitude" unit="deg" domain={[24.0, 32.0]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="A school" data={data} fill="#8884d8" />
            <text x="50%" y="5%" textAnchor="middle" dominantBaseline="middle" fontSize={18}>
              Map of Aid Organizations
            </text>
          </ScatterChart>
    </ResponsiveContainer>
  );
  
};

export default LinePlot;
