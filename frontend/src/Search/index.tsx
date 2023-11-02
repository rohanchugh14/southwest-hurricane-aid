import React from 'react';
import './Search.css';

const Search = () => {
    return (
        <div className="container">
            <div className="search-container">
                <input type="text" className="search-box" defaultValue="search" />
                <button className="search-button">Search</button>
            </div>
            <div className="results-container">
                <div className="result-box">Result 1</div>
                <div className="result-box">Result 2</div>
                <div className="result-box">Result 3</div>
                <div className="result-box">Result 4</div>
                <div className="result-box">Result 5</div>
                <div className="result-box">Result 6</div>
            </div>
        </div>
    );
};


export default Search;
