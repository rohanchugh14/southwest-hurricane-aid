import { Grid, Pagination, PaginationItem, SelectChangeEvent, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import CountyCard from "./CountyCard";
import { Link, useParams } from "react-router-dom";
import Routes from "../Routes";
import { County } from "../types";
import SortFilterBar from "../SortFilterBar/SortFilterBar";

const Counties = () => {
    const [counties, setCounties] = useState<County[]>([]);
    const [searchCriteria, setSearchCriteria] = useState("")
    const [sortCriteria, setSortCriteria] = useState("name")
    const [descending, setDescending] = useState(false)
    const [filterDirection, setFilterDirection] = useState(">")
    const [filterCriteria, setFilterCriteria] = useState("name")
    const [filterValue, setFilterValue] = useState("")
    const [pageNum, setPageNum] = useState(
        parseInt(useParams().instance?.toString() ?? "1")
    );
    const pagesize = 20;
    const [numCounties, setNumCounties] = useState(254)
    const [numPages, setNumPages] = useState(Math.ceil(numCounties / pagesize))

    // const handlePageChange = (
    //     _event: React.ChangeEvent<unknown> | null,
    //     newPage: number
    // ) => {
    //     console.log(`Set page to ${newPage}`);
    //     setPageNum(newPage);
    //     // getCounties()
    // };

    const units = {
        "name": "",
        "county_seat": "",
        "est": "",
        "population": "",
        "area": ""
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
        getCounties()
    }

    const getCounties = useCallback(async () => {

        var sortUrl = `${Routes.counties}?page=${pageNum}&per_page=20&order_by=${sortCriteria}&desc=${descending}`

        if(filterCriteria !== "" && filterDirection !== "" && filterValue !== "") {
            sortUrl += `&filter_by=${filterCriteria}&filter_direction=${filterDirection}&filter_value=${filterValue}`
        }

        if(searchCriteria !== "") {
            sortUrl += `&search_criteria=${searchCriteria}`
        }

        console.log(sortUrl)



        let res = await fetch(sortUrl, {
            method: "GET",
        });
        let resArray = await res.json();
        setCounties(resArray["counties"])
        setNumPages(resArray["total_pages"])
        setNumCounties(resArray["total_pages"] * pagesize)
    }, [pageNum, sortCriteria, descending, filterCriteria, filterDirection, filterValue, searchCriteria]);

    useEffect(() => {
        getCounties()
    }, [getCounties]);

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

                <SortFilterBar 
                    searchFieldText="Search Counties"
                    searchCriteria={searchCriteria}
                    sortCriteria={sortCriteria} 
                    descending={descending} 
                    filterCriteria={filterCriteria} 
                    filterDirection={filterDirection}
                    units={units}
                    sortNames={["Name", "County Seat", "Year Established", "Population", "Area"]}
                    sortValues={["name", "county_seat", "est", "population", "area"]}
                    filterNames={["Name", "County Seat", "Year Established", "Population", "Area"]}
                    filterValues={["name", "county_seat", "est", "population", "area"]}
                    handleSearchClicked={handleSearchClicked}
                    handleSearchCriteriaChange={handleSearchCriteriaChange}
                    handleSortCriteriaChange={handleSortCriteriaChange}
                    handleFilterCriteriaChange={handleFilterCriteriaChange}
                    handleSortDirectionChange={handleSortDirectionChange}
                    handleFilterValueChange={handleFilterValueChange}
                    handleFilterDirectionChange={handleFilterDirectionChange}/>

                <Grid container spacing={5} justifyContent={"center"}>
                    {counties.map((county) => (
                        <div style={{ padding: "10px" }}>
                            <CountyCard
                                searchTerm={searchCriteria}
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
