import * as React from 'react';
import Map, {Marker,GeolocateControl,Popup } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_TOKEN = 'pk.eyJ1Ijoicm91bGlvNTU1IiwiYSI6ImNsNHlsZDAwczIwcm4za21sZXlqc2hkMGEifQ.0ZWMXSk670FzzLM1gFR5kA'; // Set your mapbox token here

function MapCity() {
  const [showPopup, setShowPopup] = React.useState(true);
  return (
    <>
      <h1 className="text-3xl ml-[2%] mt-[1%]">Contacts</h1>
      <div className="w-[70%] h-[800px] ml-[2%] mt-[2%]  border-4 border-black">
        <Map
          initialViewState={{
            latitude: 47.238022,
            longitude: 6.024362,
            zoom: 14
          }}
          
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {showPopup && (
      <Popup longitude={6.024942} latitude={47.24438}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        Vous êtes ici
      </Popup>)}
          <Marker longitude={6.024942} latitude={47.237038} color="red" />
          <Marker longitude={6.002154} latitude={47.240724} color="red" />
          <Marker longitude={6.047449} latitude={47.233789} color="red" />
          <GeolocateControl />
        </Map>
      </div>
    </>
  );
}

export default MapCity;