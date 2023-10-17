import AidOrganizationCard from "./AidOrganizationCard";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Pagination, PaginationItem, Typography, Grid } from "@mui/material";


const AidOrganizations = () => {

    const [organizations, setOrganizations] = useState<any[]>([]);
    const [pageNum, setPageNum] = useState(parseInt(useParams().instance?.toString() ?? "1"));
    const pagesize = 20;
    const numOrganizations = 365;
    const numPages = Math.ceil(numOrganizations / pagesize)

    const handlePageChange = (
        _event: React.ChangeEvent<unknown> | null,
        newPage: number) => {
        console.log(`Set page to ${newPage}`)
        setPageNum(newPage)
    }

    useEffect(() => {
        const getOrganizations = async () => {
            let organizationsData = []
    
            //hurricane numbers start at 1, page numbers also start at 1
            let startIndex = (pageNum - 1) * pagesize + 1
            let endIndex = startIndex + pagesize
    
            if(endIndex > numOrganizations + 1) {
                endIndex = numOrganizations + 1
            }
    
            for(let i = startIndex; i < endIndex; i++) {
                let res = await fetch(`http://localhost:4000/api/aidorganizations/${i}`, {method: "GET"})
                let resArray = await res.json()
                resArray["number"] = i;
                organizationsData.push(resArray)
            }
            setOrganizations(organizationsData)
        }
        getOrganizations()
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
                        <Grid item xs={12} sm={3} style={{padding: "10px"}}>
                            <AidOrganizationCard
                                // imgurl={organization.attributes.imgurl}
                                name={organization.shelter_name}
                                index={((pageNum - 1) * pagesize) + index + 1}
                                city={organization.city}
                                address={organization.address_1}
                                county={organization.county_parish}
                                latitude={organization.latitude}
                                longitude={organization.longitude}
                                organization_name={
                                    organization
                                        .org_organization_name
                                }
                            />
                        </Grid>
                    ))}
                    </Grid>
                </div>

                <Pagination
                  page={pageNum}
                  count={numPages} 
                  style={{padding: "50px"}} 
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
