import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
} from "@mui/material";
import Routes from "../Routes";
import { County } from "../types";

const CountyInstances = () => {
    const name = useParams().instance;
    const pagesize = 20;

    const [ourCounty, setCounty] = useState<County | null>(null);
    const index = parseInt(name?.toString() ?? "1");

    useEffect(() => {
        const getCounty = async (index: number) => {
            let res = await fetch(`${Routes.counties}/${index}`, {
                method: "GET",
            });
            let resArray = await res.json();
            console.log(resArray);
            setCounty(resArray);
        };
        getCounty(index);
    }, [index]);

    return (
        <Card
            sx={{
                margin: "auto",
                width: "50%",
                marginTop: "40px",
                marginBottom: "40px",
            }}
        >
            <CardContent>
                <Typography
                    variant="h1"
                    component="div"
                    style={{ textAlign: "center" }}
                >
                    {ourCounty?.name}
                </Typography>
                <CardMedia
                    sx={{ margin: "auto", width: "50%" }}
                    component="img"
                    image={ourCounty?.map}
                    alt="member image"
                />
                <Typography variant="body1" color="text.secondary">
                    <b>Population: </b> {ourCounty?.population}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <b>Land area: </b> {ourCounty?.area} <b> sq. miles</b>
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <b>Est: </b> {ourCounty?.est}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <b>County Seat: </b> {ourCounty?.county_seat}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <b>Hurricanes: </b>{" "}
                    <Grid>
                        {ourCounty?.hurricanes?.map((h) => (
                            <Link to={`/Hurricanes/HurricaneInstances/${h.id}`}>
                                <Button color="primary">{h.name}</Button>
                            </Link>
                        ))}
                    </Grid>
                </Typography>

                <Typography variant="body1" color="text.secondary">
                    <b>Aid Organizations: </b>{" "}
                    <Grid>
                        {ourCounty?.aid_organizations?.map((a) => (
                            <Link
                                to={`/Aid Organizations/AidOrganizationInstances/${a.id}`}
                            >
                                <Button color="primary">
                                    {a.shelter_name}
                                </Button>
                            </Link>
                        ))}
                    </Grid>
                </Typography>
                <Link to={`/Counties/${Math.ceil(index / pagesize)}`}>
                    <Button
                        style={{ marginTop: "15px" }}
                        className="back-button"
                        variant="contained"
                    >
                        Back{" "}
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default CountyInstances;
