import React, { useState, useEffect } from 'react';
import { RadialChart } from 'react-vis';
import Routes from "../Routes";

const VisPieChart = () => {
    const [myData, setData] = useState([]);

    useEffect(() => {
        const getHurricaneData = async () => {
            const link = `${Routes.HOST}/api/hurricanes?per_page=9999`;
            let res = await fetch(link, {
                method: "GET",
            });
            let resArray = await res.json();

            const categoryCounts = {};
            resArray["hurricanes"].forEach((hurricane) => {
                const category = hurricane.category;
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            });

            const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
                angle: count,
                label: `Category ${category}`
            }));

            setData(chartData);
        };

        getHurricaneData();
    }, []);

    return (
        <RadialChart
            data={myData}
            width={300}
            height={300}
            showLabels
            colorType="literal"
        />
    );
};

export default VisPieChart;
