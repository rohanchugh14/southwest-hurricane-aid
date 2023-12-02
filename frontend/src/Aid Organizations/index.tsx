import AidOrganizationCard from "./AidOrganizationCard";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Pagination, PaginationItem, Typography, Grid, SelectChangeEvent } from "@mui/material";
import Routes from "../Routes";
import SortFilterBar from "../SortFilterBar/SortFilterBar";

const AidOrganizations = () => {
    const [organizations, setOrganizations] = useState<any[]>([]);
    const [searchCriteria, setSearchCriteria] = useState("")
    const [sortCriteria, setSortCriteria] = useState("shelter_name")
    const [descending, setDescending] = useState(false)
    const [filterDirection, setFilterDirection] = useState(">")
    const [filterCriteria, setFilterCriteria] = useState("shelter_name")
    const [filterValue, setFilterValue] = useState("")
    const [pageNum, setPageNum] = useState(
        parseInt(useParams().instance?.toString() ?? "1")
    );
    const pagesize = 20;
    const [numOrganizations, setNumOrganizations] = useState(746)
    const [numPages, setNumPages] = useState(Math.ceil(numOrganizations / pagesize))


    type units = {
        [key: string]: string
    }

    const units = {
        "category": "",
        "highest winds": "mph",
        "fatalities": "",
        "lowest pressure": "mbar"
    }

    const handlePageChange = (
        _event: React.ChangeEvent<unknown> | null,
        newPage: number
    ) => {
        console.log(`Set page to ${newPage}`);
        setPageNum(newPage);
    };

    const handleSortCriteriaChange = (
        event: SelectChangeEvent
    ) => {
        setSortCriteria(event.target.value as string)
    }

    const handleFilterCriteriaChange = (
        event: SelectChangeEvent
    ) => {
        setFilterCriteria(event.target.value as string)
    }

    const handleFilterDirectionChange = () => {

        switch(filterDirection) {
            case "<": {
                setFilterDirection("=");
                break;
            }
            case "=": {
                setFilterDirection(">");
                break;
            }
            default: {
                console.log("hello")
                setFilterDirection("<");
                break;
            }
                
        }
    }

    const handleSortDirectionChange = () => {
        console.log("Descending set to " + descending)
        setDescending(!descending)

    }

    const handleFilterValueChange = (_event: any) => {
        setFilterValue(_event.target.value)
    }

    const handleSearchCriteriaChange = (_event: any) => {
        console.log(_event.target.value)
        setSearchCriteria(_event.target.value)
    }

    const handleSearchClicked = () => {
        getOrganizations()
    }

    const getOrganizations = async () => {


        var sortUrl = `${Routes.aidOrganizations}?page=${pageNum}&per_page=20&order_by=${sortCriteria}&desc=${descending}`

        if(filterCriteria != "" && filterDirection != "" && filterValue != "") {
            sortUrl += `&filter_by=${filterCriteria}&filter_direction=${filterDirection}&filter_value=${filterValue}`
        }

        if(searchCriteria != "") {
            sortUrl += `&search_criteria=${searchCriteria}`
        }

        console.log(sortUrl)
        let res = await fetch(sortUrl, {
            method: "GET",
        });
        let resArray = await res.json();
        
        setOrganizations(resArray["aid_organizations"])
        setNumPages(resArray["total_pages"])
        setNumOrganizations(resArray["total_pages"] * pagesize)
        
    };


    useEffect(() => {
        getOrganizations();
    }, [pageNum, sortCriteria, descending, filterCriteria, filterDirection, filterValue, searchCriteria]);

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
                        county, organization, and phone number. <b>Number of organizations: </b>{numOrganizations}
                    </Typography>
                </div>

                <SortFilterBar
                    searchFieldText="Search Aid Organizations"
                    searchCriteria={searchCriteria}
                    sortCriteria={sortCriteria} 
                    descending={descending} 
                    filterCriteria={filterCriteria} 
                    filterDirection={filterDirection}
                    sortNames={["Name", "Address", "City", "Organization Name", "Score"]}
                    sortValues={["shelter_name", "address_1", "city", "org_organization_name", "score"]}
                    filterNames={["Name", "Address", "City", "Organization Name", "Score"]}
                    filterValues={["shelter_name", "address_1", "city", "org_organization_name", "score"]}
                    units={units}
                    handleSearchClicked={handleSearchClicked}
                    handleSearchCriteriaChange={handleSearchCriteriaChange}
                    handleSortCriteriaChange={handleSortCriteriaChange}
                    handleFilterCriteriaChange={handleFilterCriteriaChange}
                    handleSortDirectionChange={handleSortDirectionChange}
                    handleFilterValueChange={handleFilterValueChange}
                    handleFilterDirectionChange={handleFilterDirectionChange}/>


                <Grid container spacing={5} justifyContent={"center"}>
                    {organizations.map((organization) => (
                        <Grid item style={{ padding: "10px" }}>
                            <AidOrganizationCard
                                searchTerm={searchCriteria}
                                aidOrganization={organization}
                            />
                        </Grid>
                    ))}
                </Grid>

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
