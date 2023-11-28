import React, { useState, useEffect } from "react";
import HurricaneCard from "../HurricaneCard";
import Grid from "@mui/material/Grid";
import { AppBar, Button, Checkbox, Divider, FormControl, IconButton, InputBase, InputLabel, MenuItem, Pagination, PaginationItem, Paper, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Hurricane } from "../types";
import Routes from "../Routes";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import SortFilterBar from "../SortFilterBar/SortFilterBar";


const Hurricanes = () => {
    const [hurricanes, setHurricanes] = useState<Hurricane[]>([]);
    const [searchCriteria, setSearchCriteria] = useState("")
    const [sortCriteria, setSortCriteria] = useState("name")
    const [descending, setDescending] = useState(false)
    const [filterDirection, setFilterDirection] = useState(">")
    const [filterCriteria, setFilterCriteria] = useState("category")
    const [filterValue, setFilterValue] = useState("")
    const [pageNum, setPageNum] = useState(
        parseInt(useParams().instance?.toString() ?? "1")
    );
    const pagesize = 20;

    const [numHurricanes, setNumHurricanes] = useState(91)
    const [numPages, setNumPages] = useState(Math.ceil(numHurricanes / pagesize))


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
        getHurricanes()
    }


    const getHurricanes = async () => {
        console.log("Get hurricanes")
        console.log("Get hurricanes desc = ", descending, "sortCriteria", sortCriteria)
        var sortUrl = `${Routes.hurricanes}?page=${pageNum}&per_page=20&order_by=${sortCriteria}&desc=${descending}`

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
        setHurricanes(resArray["hurricanes"])
        setNumPages(resArray["total_pages"])
        setNumHurricanes(resArray["total_pages"] * pagesize)
    };


    useEffect(() => {
        getHurricanes()
    }, [pageNum, sortCriteria, descending, filterCriteria, filterDirection, filterValue, searchCriteria]);

    // useEffect(() => {
    //     getHurricanes();
    // }, [pageNum, sortCriteria, descending, filterCriteria, filterDirection, filterValue]);



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

                <div style={{ margin: "10px 30% 0px 30%" }}>
                    <Typography variant="subtitle1" textAlign={"center"}>
                        Below is a list of
                        hurricanes that affected Texas along with a few
                        attributes of each hurricane including attributes such
                        as their name, category, date, wind speed, and
                        fatalities.
                    </Typography>
                    <Typography variant="subtitle1" textAlign={"center"}>
                        <b>Number of hurricanes: </b>{numHurricanes}
                    </Typography>
                </div>


                <SortFilterBar 
                    searchFieldText="Search Hurricanes"
                    searchCriteria={searchCriteria}
                    sortCriteria={sortCriteria} 
                    descending={descending} 
                    filterCriteria={filterCriteria} 
                    filterDirection={filterDirection}
                    sortNames={["Name", "Category", "Highest Winds", "Lowest Pressure", "Deaths"]}
                    sortValues={["name", "category", "highest_winds_mph", "lowest_pressure_mbar", "deaths"]}
                    filterNames={["Name", "Category", "Highest Winds", "Lowest Pressure", "Deaths"]}
                    filterValues={["name", "category", "highest_winds_mph", "lowest_pressure_mbar", "deaths"]}
                    units={units}
                    handleSearchClicked={handleSearchClicked}
                    handleSearchCriteriaChange={handleSearchCriteriaChange}
                    handleSortCriteriaChange={handleSortCriteriaChange}
                    handleFilterCriteriaChange={handleFilterCriteriaChange}
                    handleSortDirectionChange={handleSortDirectionChange}
                    handleFilterValueChange={handleFilterValueChange}
                    handleFilterDirectionChange={handleFilterDirectionChange}/>

                <Grid container spacing={5} justifyContent={"center"}>
                    {hurricanes.map((hurricane, index) => (
                        <Grid item>
                            <HurricaneCard
                                // index={(pageNum - 1) * pagesize + index + 1}
                                searchTerm={searchCriteria}
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
