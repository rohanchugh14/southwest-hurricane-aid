import React from "react";
import HurricaneCard from "../components/HurricaneCard";
import hurricaneData from "../Data/hurricane_data.json";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const Hurricanes = () => {
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
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {hurricaneData.map((hurricane) => (
                        <Grid
                            item
                            xs={12}
                            sm={3}
                            style={{ padding: "10px", width: 300 }}
                        >
                            <HurricaneCard
                                image={hurricane.Image}
                                name={hurricane.Name}
                                category={hurricane.Category}
                                date={hurricane.Date}
                                WindSpeed={hurricane.WindSpeed}
                                Fatalities={hurricane.Fatalities}
                            />
                        </Grid>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hurricanes;
