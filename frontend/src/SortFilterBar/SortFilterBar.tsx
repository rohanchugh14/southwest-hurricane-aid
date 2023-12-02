import React from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, IconButton, InputAdornment, InputBase, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";

type Props = {
    searchFieldText: string,
    searchCriteria: string,
    sortCriteria: string,
    descending: boolean,
    filterDirection: string,
    filterCriteria: string,
    units: {[key: string]: string;},
    sortNames: string[],
    sortValues: string[],
    filterNames: string[],
    filterValues: string[],
    handleSearchClicked: () => void;
    handleSearchCriteriaChange: (_event: any) => void,
    handleSortCriteriaChange: (event: SelectChangeEvent) => void,
    handleFilterCriteriaChange: (event: SelectChangeEvent) => void,
    handleFilterValueChange: (_event: any) => void,
    handleFilterDirectionChange: () => void,
    handleSortDirectionChange: () => void
}



function SortFilterBar(props : Props) {



  return (
    <Stack width={"100%"} justifyContent={"center"} direction={"row"} spacing={2} style={{ margin: "50px" }}>

    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={props.searchFieldText}
            onChange={props.handleSearchCriteriaChange}
        />
        <IconButton type="button" sx={{ p: '10px' }} onClick={props.handleSearchClicked}>
            <SearchIcon />
        </IconButton>
    </Paper>


    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
    >   
        <FormControl style={{ minWidth: "100px"}}>
            <InputLabel>Sort By</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.sortCriteria}
                label="Sort By"
                onChange={props.handleSortCriteriaChange}
            >
                {props.sortNames.map((item, index) => <MenuItem value={props.sortValues[index]}>{item}</MenuItem>)}
            </Select>
        </FormControl>
        

        <IconButton type="button" sx={{p: "10px"}} onClick={props.handleSortDirectionChange}>
            {props.descending ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
        </IconButton>
            
    </Paper>

    <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
    >   
        <FormControl style={{ minWidth: "100px"}}>
            <InputLabel>Filter By</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.filterCriteria}
                label="Filter By"
                onChange={props.handleFilterCriteriaChange}
            >
                {props.filterNames.map((item, index) => <MenuItem value={props.filterValues[index]}>{item}</MenuItem>)}
            </Select>
        </FormControl>
        

        <IconButton type="button" sx={{p: "10px"}} onClick={props.handleFilterDirectionChange}>
            {props.filterDirection}
        </IconButton>

        <FormControl sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
          <TextField
            onChange={props.handleFilterValueChange}
            InputProps={{
                endAdornment: <InputAdornment position="end">{props.units[props.filterCriteria as keyof typeof props.units]}</InputAdornment>
            }}

          />
        </FormControl>


            
    </Paper>


    





</Stack>
  )
}

export default SortFilterBar