import AidOrganizationCard from "./AidOrganizationCard";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Pagination, PaginationItem, Typography, Grid } from "@mui/material";
import Routes from "../Routes";

const AidOrganizations = () => {
    const [organizations, setOrganizations] = useState<any[]>([]);
    const [pageNum, setPageNum] = useState(
        parseInt(useParams().instance?.toString() ?? "1")
    );
    const pagesize = 20;
    const numOrganizations = 365;
    const numPages = Math.ceil(numOrganizations / pagesize);

    const handlePageChange = (
        _event: React.ChangeEvent<unknown> | null,
        newPage: number
    ) => {
        console.log(`Set page to ${newPage}`);
        setPageNum(newPage);
    };

    useEffect(() => {
        const getOrganizations = async () => {
        
            let res = await fetch(`${Routes.aidOrganizations}?page=${pageNum}&per_page=${pagesize}`, {
                method: "GET",
            });
            let resArray = await res.json();
            setOrganizations(resArray["aid_organizations"])
            
            
        };
        getOrganizations();
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
                <Typography variant="h3">Aid Organizations</Typography>
                <div style={{ padding: "50px" }}>
                    <Typography variant="subtitle1">
                        <b>Southwest Hurricane Aid</b> Below is a list of aid
                        organization locations that helped Texas during
                        hurricanes along with a few attributes of each hurricane
                        including attributes such as their name, address,
                        county, organization, and phone number.
                    </Typography>
                </div>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Grid container spacing={5}>
                        {organizations.map((organization, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={3}
                                style={{ padding: "10px" }}
                            >
                                <AidOrganizationCard
                                    aidOrganization={organization}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>

                <Pagination
                    page={pageNum}
                    count={numPages}
                    style={{ padding: "50px" }}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/Aid Organizations/${item.page}`}
                            {...item}
                        />
                    )}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AidOrganizations;
