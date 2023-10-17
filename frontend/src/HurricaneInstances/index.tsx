import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Card,
    Fab,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import Routes from "../Routes";
import { Hurricane } from "../types";

const HurricaneInstances = () => {
    const name = useParams().instance;
    const pagesize = 20;

    const [hurricane, setHurricane] = useState<Hurricane | null>(null);
    const index = parseInt(name?.toString() ?? "1");

    useEffect(() => {
        const getHurricane = async (index: number) => {
            let res = await fetch(`${Routes.hurricanes}/${index}`, {
                method: "GET",
            });
            let resArray = await res.json();
            setHurricane(resArray);
        };
        getHurricane(index);
    }, [index]);

    return (
        <>
            <Card
                sx={{
                    margin: "auto",
                    width: "50%",
                    marginTop: 5,
                    marginBottom: 5,
                    boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
            >
                <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    to={`/Hurricanes/${Math.ceil(index / pagesize)}`}
                    className="back-button"
                >
                    <Fab sx={{ margin: 1 }}>Back </Fab>
                </Link>

                <Typography variant="h1" textAlign="center">
                    {hurricane?.name}
                </Typography>
                <img src={hurricane?.image} width="100%" alt="hurricane" />

                <List component="nav" aria-label="mailbox folders">
                    <ListItem divider>
                        <ListItemText
                            primary={"Category "}
                            secondary={
                                hurricane?.category === -1
                                    ? "Tropical Depression"
                                    : hurricane?.category === 0
                                    ? "Tropical Storm"
                                    : hurricane?.category
                            }
                        />
                    </ListItem>
                    <ListItem divider>
                        <ListItemText
                            primary={"Date "}
                            secondary={hurricane?.formed}
                        />
                    </ListItem>
                    <ListItem divider>
                        <ListItemText
                            primary={"Wind Speed "}
                            secondary={hurricane?.highest_winds + " MPH"}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary={"Fatalities "}
                            secondary={hurricane?.deaths}
                        />
                    </ListItem>
                    <ListItem>
                        <Link
                            style={{ textDecoration: "none" }}
                            to={
                                "/Counties/CountyInstances/" +
                                hurricane?.counties_mentioned.split(",")[0]
                            }
                        >
                            {/* TODO change this to have multiple links */}{" "}
                            {hurricane?.counties_mentioned.split(",")[0]}{" "}
                        </Link>
                    </ListItem>
                    {/* <ListItem>
            <Link
              style={{ textDecoration: "none" }}
              to={
                "/Aid Organizations/AidOrganizationInstances/" +
                ourHurricane?.Aid
              }
            >
              {" "}
              {ourHurricane?.Aid}{" "}
            </Link>
          </ListItem> */}
                </List>
            </Card>
        </>
    );
};

export default HurricaneInstances;
