import React from 'react'
import ScatterPlot from './county_visual'
import LinePlot from './Graph2'
import VisPieChart from './pie'

const OurVisualizations = () => {
  return (
    <div>
        <ScatterPlot />
        <LinePlot/>
        <VisPieChart/>
    </div>
  )
}

export default OurVisualizations