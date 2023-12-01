import React, { useState, useEffect } from 'react';
import { RadialChart } from 'react-vis';
import { Heading } from "@chakra-ui/react";

const VisPieChart = () => {
    const [myData, setData] = useState([]);
    const generateBrightColor = (index) => {
        const hue = index * 138.508; 
        return `hsl(${hue}, 100%, 65%)`; 
    };
    useEffect(() => {
        const getHurricaneData = async () => {
            // const link = `${Routes.HOST}/api/hurricanes?per_page=9999`;
            const link = `https://api.southwesthurricaneaid.me/api/hurricanes?per_page=9999`;

            let res = await fetch(link, {
                method: "GET",
            });
            let resArray = await res.json();

            const categoryCounts = {};
            resArray["hurricanes"].forEach((hurricane) => {
                const category = hurricane.category;
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            });

            const chartData = Object.entries(categoryCounts).map(([category, count], index) => ({
                angle: count,
                label: `Category ${category}`,
                color: generateBrightColor(index)
            }));

            setData(chartData);
        };

        getHurricaneData();
    }, []);

    return (
        <>
        <Heading size="md" color="black">Pie Chart of Hurricanes by Category</Heading>
        <RadialChart
            data={myData}
            width={700}
            height={700}
            showLabels
            labelsStyle={{
                fill: "white",
                fontWeight: 'bold',
                textAnchor:"start"
            }}
            margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
            colorType="literal"
        />
        </>
    );
};

export default VisPieChart;
