import React, { useState, useEffect } from "react";
import { VStack, Box, Heading, Text } from "@chakra-ui/react";
import {
    MarkSeries,
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    HorizontalBarSeries,
    VerticalBarSeries,
    RadialChart
} from 'react-vis';
import axios from "axios";

const ProviderVisualizations = () => {
    let [viz1, setViz1] = useState([]);
    let [viz2, setViz2] = useState([]);
    let [viz3, setViz3] = useState([]);

    useEffect(() => {
        axios
            .get("https://new-york-aid.me/api/getAllPrograms")
            .then((response) => {
                let bars = new Map();
                response.data.forEach((program) => {
                    if (!bars.has(program.borough)) {
                        bars.set(program.borough, 1);
                    } else {
                        bars.set(program.borough, bars.get(program.borough) + 1);
                    }
                });
                setViz1(Array.from(bars,
                    (([borough, count]) => ({ "y": count, "x": borough }))));
            })
    }, []);

    useEffect(() => {
        axios
            .get("https://new-york-aid.me/api/getAllHousing")
            .then((response) => {
                let dataPoints = [];
                response.data.forEach((program) => {
                    if (program.total_beds != null) {
                        dataPoints.push({ x: program.total_beds, y: program.total_units }); // Adjust y as needed
                    }
                });
                console.log(dataPoints);
                setViz2(dataPoints);
            })
    }, []);

    useEffect(() => {
        axios
            .get("https://new-york-aid.me/api/getAllClinics")
            .then((response) => {
                let bars = new Map();
                response.data.forEach((program) => {
                    if (!bars.has(program.county)) {
                        bars.set(program.county, 1);
                    } else {
                        bars.set(program.county, bars.get(program.county) + 1);
                    }                
                });
                setViz3(Array.from(bars,
                    (([county, count]) => ({ "y": count, "x": county }))));
            })
    }, []);


    return (
        <VStack spacing={8} p={8} align="stretch">
            <Box>
                <Heading mb={4} color="white">ProviderVisualizations</Heading>
            </Box>
            <Box boxShadow="md" p="6" rounded="md" bg="white">
                <Heading size="md" color="black">Number of Programs</Heading>
                <Text mt={2} color="black">Number of Benefit Programs in Each Borough</Text>
                <XYPlot xType="ordinal" width={1000} height={300} xDistance={1000}
                    style={{
                        fontSize: '0.6em'
                    }}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={viz1} />
                </XYPlot>
            </Box>

            <Box boxShadow="md" p="6" rounded="md" bg="white">
                <Heading size="md" color="black">Scatterplot of Total Beds vs Total Units</Heading>
                <Text mt={2} color="black">Total Beds vs Total Units Available for Housing Facilities</Text>
                <XYPlot width={1500} height={500} margin={{ "left": 100 }}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Total Beds in Building" />
                    <YAxis title="Total Units in Building" />
                    <MarkSeries data={viz2} />
                </XYPlot>
            </Box>

            <Box boxShadow="md" p="6" rounded="md" bg="white">
                <Heading size="md" color="black">Healthcare Clinics</Heading>
                <Text mt={2} color="black">Number of Healthcare Clinics in each County</Text>
                <XYPlot xType="ordinal" width={1000} height={300} xDistance={1000}
                    style={{
                        fontSize: '0.6em'
                    }}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={viz3} />
                </XYPlot>
            </Box>

        </VStack >
    );
};

export default ProviderVisualizations;
