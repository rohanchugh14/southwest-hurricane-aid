import Routes from "../Routes";
import { useState, useEffect } from "react";
import { VStack, Box, Heading, Text } from "@chakra-ui/react";
import {
    MarkSeries,
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
} from 'react-vis';

const ScatterPlot = () => {
  const [data, setData] = useState([])
  useEffect(() => {
      const getCounties = async () => {
        const link = `${Routes.HOST}/api/counties?per_page=9999&include_hurricanes=True&include_orgs=True`
        let res = await fetch(link, {
          method: "GET",
        });
        let resArray = await res.json();
        var data = resArray["counties"].map((county) => ({
            "y": county.hurricanes?.length,
            "x": county.aid_organizations?.length
        }))
        console.log(resArray);
        console.log(data);
        setData(data);
      }
      getCounties();
    }, [])

  return (
    <VStack spacing={8} p={8} align="stretch">
      <Box boxShadow="md" p="6" rounded="md" bg="white">
        <Heading size="md" color="black">Scatterplot of Counties by Number of Aid Organizations and Hurricanes</Heading>
        <Text mt={2} color="black">Number of Hurricanes vs Number of Organizations</Text>
        <XYPlot width={1500} height={500} margin={{ "left": 100 }}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis title="Number of Hurricanes" />
            <YAxis title="Number of Aid Organizations" />
            <MarkSeries data={data} />
        </XYPlot>
      </Box>
    </VStack>

  );      
};

export default ScatterPlot;