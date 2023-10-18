import React, { useState, useEffect } from "react";
import HurricaneCard from "../HurricaneCard";
import Grid from "@mui/material/Grid";
import { Pagination, PaginationItem, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Hurricane } from "../types";
import Routes from "../Routes";

const Hurricanes = () => {
    const [hurricanes, setHurricanes] = useState<Hurricane[]>([]);
    const [pageNum, setPageNum] = useState(
        parseInt(useParams().instance?.toString() ?? "1")
    );
    const pagesize = 20;
    const numHurricanes = 91;
    const numPages = Math.ceil(numHurricanes / pagesize);

    const handlePageChange = (
        _event: React.ChangeEvent<unknown> | null,
        newPage: number
    ) => {
        console.log(`Set page to ${newPage}`);
        setPageNum(newPage);
    };

    useEffect(() => {
        const getHurricanes = async () => {
            let res = await fetch(`${Routes.hurricanes}?page=${pageNum}&per_page=20`, {
                method: "GET",
            });
            let resArray = await res.json();
            setHurricanes(resArray["hurricanes"])
        };
        getHurricanes();
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
                <Typography variant="h3">Hurricanes</Typography>

                <div style={{ padding: "50px" }}>
                    <Typography variant="subtitle1">
                        <b>Southwest Hurricane Aid</b> Below is a list of
                        hurricanes that affected Texas along with a few
                        attributes of each hurricane including attributes such
                        as their name, category, date, wind speed, and
                        fatalities.
                    </Typography>
                </div>

                <Grid container spacing={5} justifyContent={"center"}>
                    {hurricanes.map((hurricane, index) => (
                        <Grid item>
                            <HurricaneCard
                                // index={(pageNum - 1) * pagesize + index + 1}
                                hurricane={hurricane}
                            />
                        </Grid>
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
                                to={`/Hurricanes/${item.page}`}
                                {...item}
                            />
                        )}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Hurricanes;
