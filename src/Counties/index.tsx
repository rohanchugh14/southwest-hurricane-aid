import React from 'react'
import './Counties.css'
import {BrowserRouter as Router, Route, Routes, Link,} from "react-router-dom";


const Counties = () => {
  return (
    <div className = "page-title">Counties
        <div className = "county">
            <img src = "https://picsum.photos/200/300" alt = "Card Image" className = "county-image"/>
            <h1 className = "county-name"> Harris County</h1>
            <p className = "county-description">This is a county in Texas</p>
            <a href = "cardPage" className = "county-button">Learn More </a>
        </div>
    </div>
  )
}

export default Counties