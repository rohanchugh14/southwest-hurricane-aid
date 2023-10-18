import React from "react";
import GoogleMapReact from "google-map-react";

type GoogleMapProps = {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
};

type ReactComponentProps = {
  lat: number;
  lng: number;
  text: string;
};

const ReactComponent: React.FC<ReactComponentProps> = ({ text }) => (
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
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={center}
        zoom={zoom}
      >
        <ReactComponent lat={59.955413} lng={30.337844} text="Location" />
      </GoogleMapReact>
    </div>
  );
};

export default MapsComponent;

