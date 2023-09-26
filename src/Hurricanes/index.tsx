import React from "react";
import HurricaneCard from "../components/HurricaneCard";
import hurricaneData from "../Data/hurricane_data.json";

const Hurricanes = () => {
  return (
    <div>
      {hurricaneData.map((hurricane, index) => (
        <HurricaneCard
          // image={hurricane.image}
          name={hurricane.Name}
          category={hurricane.Category}
          date={hurricane.Date}
        />
      ))}
    </div>
  );
};

export default Hurricanes;
