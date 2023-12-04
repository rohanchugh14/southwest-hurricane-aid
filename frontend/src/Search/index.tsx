import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Routes from "../Routes";
// import "./Search.css";
import { Box, Button, ButtonGroup, Grid, IconButton, InputBase, Link, Paper, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AidOrganization, County, Hurricane } from "../types";
import { Spacer } from "@chakra-ui/react";
import AidOrganizationCard from "../Aid Organizations/AidOrganizationCard";
import HurricaneCard from "../HurricaneCard";
import { Props } from "recharts/types/container/Surface";
import CountyCard from "../Counties/CountyCard";

type SearchResult = {
  aid_organizations: AidOrganization[];
  counties: County[];
  hurricanes: Hurricane[];
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(useParams().searchTerm ?? "");
  const [searchInput, setSearchInput] = useState(useParams().searchTerm ?? "");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [model, setModel] = useState("hurricane");


  const SearchResultsComponent = () => {

    let resultsComponent;
  
    // Conditionally set the component based on the value of the name variable
    if (model === 'hurricane') {
      resultsComponent = searchResults?.hurricanes?.map((result) => {
        return <Grid item><HurricaneCard searchTerm={searchTerm} hurricane={result} /> </Grid>
      });
    } else if (model === 'aid_organization') {
      resultsComponent = searchResults?.aid_organizations?.map((result) => {
        return <Grid item><AidOrganizationCard searchTerm={searchTerm} aidOrganization={result} imgurl=""/> </Grid>
      });
      // resultsComponent = searchResults?.aid_organizations.map((result) =>  {
      //   return <div className="result-box"><Link href={`/Aid Organizations/AidOrganizationInstances/${result.id}`}>{result.shelter_name}</Link></div>
      // })
    } else {
      resultsComponent = searchResults?.counties?.map((result) => {
        return <Grid item><CountyCard searchTerm={searchTerm} county={result} /> </Grid>
      });
    }



    return (
      <Grid container spacing={5} justifyContent={"center"} className="results-container">
          {resultsComponent}
      </Grid>
    )
  
  };


  useEffect(() => {
    const getSearch = async (searchTerm: string) => {
      let res = await fetch(`${Routes.search}/${searchTerm}`, {
        method: "GET",
      });
      let resArray = await res.json();
      setSearchResults(resArray);
    };
    getSearch(searchTerm);
  }, [searchTerm, model]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <>
      <Box width={"80%"} margin={"auto"}>

        <Paper
          component="form"
          onSubmit={handleSubmit}
          className="search-box"
          sx={{ mt: 5, p: '2px 4px', display: 'flex', alignItems: 'center' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={"Search"}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="search-box"
          />
          <IconButton 
            type="button" 
            sx={{ p: '10px' }} 
            aria-label="search"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setSearchTerm(searchInput)}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <Stack justifyContent={"space-between"} direction={"row"} spacing={2} style={{ margin: "50px" }}>
          <Button onClick={(event) => {setModel("hurricane")}}>Hurricanes</Button>
          <Button onClick={(event) => {setModel("county")}}>Counties</Button>
          <Button onClick={(event) => {setModel("aid_organization")}}>Aid Organizations</Button>
        </Stack>


        <Grid container spacing={5} justifyContent={"center"} className="results-container">
          <SearchResultsComponent />
        </Grid>
        </Box>
    </>
  );
};

export default Search;
