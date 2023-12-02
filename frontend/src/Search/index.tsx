import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Routes from "../Routes";
import "./Search.css";
import { IconButton, InputBase, Link, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AidOrganization, County, Hurricane } from "../types";

type SearchResult = {
  aid_organizations: AidOrganization[];
  counties: County[];
  hurricanes: Hurricane[];
};

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(useParams().searchTerm ?? "");
  const [searchInput, setSearchInput] = useState(useParams().searchTerm ?? "");
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  useEffect(() => {
    const getSearch = async (searchTerm: string) => {
      let res = await fetch(`${Routes.search}/${searchTerm}`, {
        method: "GET",
      });
      let resArray = await res.json();
      setSearchResults(resArray);
    };
    getSearch(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <>
      <div className="container">
        <Paper
          component="form"
          onSubmit={handleSubmit}
          style={{ marginTop: "50px", width: "75%" }}
          className="search-box"
        >
          <InputBase
            sx={{ ml: 1, mb: 1, flex: 1 }}
            placeholder={"Search"}
            value={searchInput}
            style={{ width: "95%" }}
            onChange={(event) => setSearchInput(event.target.value)}
            className="search-box"
          />
          <IconButton
            size="large"
            aria-label="search"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={() => setSearchTerm(searchInput)}
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        <div className="results-container">
          {searchResults?.aid_organizations.map((result) =>  {
            return <div className="result-box"><Link href={`/Aid Organizations/AidOrganizationInstances/${result.id}`}>{result.shelter_name}</Link></div>
          })}
          {searchResults?.counties.map((result) =>  {
            return <div className="result-box"><Link href={`/Aid Organizations/AidOrganizationInstances/${result.id}`}>{result.name}</Link></div>
          })}
          {searchResults?.hurricanes.map((result) =>  {
            return <div className="result-box"><Link href={`/Aid Organizations/AidOrganizationInstances/${result.id}`}>{result.name}</Link></div>
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
