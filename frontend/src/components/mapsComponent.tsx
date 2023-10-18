import React from "react";
import GoogleMapReact from "google-map-react";

type GoogleMapProps = {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
};

type AnyReactComponentProps = {
  lat: number;
  lng: number;
  text: string;
};

const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => (
  <div>{text}</div>
);

const MapsComponent: React.FC<GoogleMapProps> = ({ center, zoom }) => {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBWOc0C0DZEDWxagW9HDrnH21NDVnqSTkU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={center}
        zoom={zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default MapsComponent;

