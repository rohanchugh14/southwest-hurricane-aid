import { Grid, Pagination, PaginationItem, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CountyCard from "./CountyCard";
import { Link, useParams } from "react-router-dom";
import Routes from "../Routes";
import { County } from "../types";

const Counties = () => {
    const [counties, setCounties] = useState<County[]>([]);
    const [pageNum, setPageNum] = useState(
        parseInt(useParams().instance?.toString() ?? "1")
    );
    const pagesize = 20;
    const numCounties = 254;
    const numPages = Math.ceil(numCounties / pagesize);

    const handlePageChange = (
        _event: React.ChangeEvent<unknown> | null,
        newPage: number
    ) => {
        console.log(`Set page to ${newPage}`);
        setPageNum(newPage);
        // getCounties()
    };

    useEffect(() => {
        const getCounties = async () => {
            let res = await fetch(`${Routes.counties}?page=${pageNum}&per_page=${pagesize}`, {
                method: "GET",
            });
            let resArray = await res.json();
            setCounties(resArray["counties"])
        };
        getCounties();
    }, [pageNum]);

    return (
        <div style={{ margin: "10px" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "50px",
                    paddingBottom: "0px",
                }}
            >
                <div>
                    <Typography variant="h3">Texas Counties</Typography>
                </div>
                <div style={{ padding: "50px" }}>
                    <Typography variant="subtitle1">
                        <b>Southwest Hurricane Aid</b> Below is a list of all of
                        the counties in Texas along with a few attributes of
                        each county including attributes such as name,
                        population, land area, region, and precipitation. <b>Number of counties: </b>{numCounties}
                    </Typography>
                </div>
                <Grid container spacing={5} justifyContent={"center"}>
                    {counties.map((county) => (
                        <div style={{ padding: "10px" }}>
                            <CountyCard
                                county={county}
                            />
                        </div>
                    ))}
                </Grid>

                <div>
                    <Pagination
                        page={pageNum}
                        count={numPages}
                        style={{ padding: "50px" }}
                        renderItem={(item) => (
                            <PaginationItem
                                component={Link}
                                to={`/Counties/${item.page}`}
                                {...item}
                            />
                        )}
                        onChange={handlePageChange}
                    />
                </div>
            </div>

            <div style={{ paddingLeft: "100px" }}></div>
        </div>
    );
};

export default Counties;
