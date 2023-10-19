import React from "react";
import GoogleMapReact from "google-map-react";

type GoogleMapProps = {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
};


const MapsComponent: React.FC<GoogleMapProps> = ({ center, zoom }) => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "30vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBWOc0C0DZEDWxagW9HDrnH21NDVnqSTkU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={center}
        zoom={zoom}
      >
      </GoogleMapReact>
    </div>
  );
};

export default MapsComponent;

