import * as React from 'react';
import Map, {Marker,GeolocateControl,Popup } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_TOKEN = 'pk.eyJ1Ijoicm91bGlvNTU1IiwiYSI6ImNsNTB4dmI0bzAwZDQzaW15NGgyb3RneDEifQ.epmA_h4FwLOoZLymM0uZtw'; // Set your mapbox token here

function MapCity() {
  const [viewport, setViewport] = React.useState({
    latitude: 47.238022,
    longitude: 6.024362,
    zoom: 14,
    pitch: 40,
    bearing: 0
  });

  const [showPopup, setShowPopup] = React.useState(true);
  const [markers, setMarkers] = React.useState([]);

  const handleClick = (event) => {
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    //console.log(longitude, latitude);
    setMarkers(markers => [...markers,{long:longitude, lat:latitude}]);
    console.log(markers);
  };
   
  return (
    <>
      <h1 className="text-3xl ml-[2%] mt-[1%]">Contacts</h1>
      <div className="w-[70%] h-[800px] ml-[2%] mt-[2%]  border-4 border-black">
        <Map
         onClick={handleClick}
        initialViewState={viewport}
        width="100vw"
        height="100vh"
        /* mapboxApiAccessToken= {MAPBOX_TOKEN} */
        onViewportChange={viewport => setViewport(viewport)}
        {...viewport}
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
            {
            markers.map((coordinate) => (
              <>
              <p>fsdfsdfsdf</p>
              <Marker longitude={coordinate.long} latitude={coordinate.lat} color="red" />
              </>
            ))
            }  
          <GeolocateControl />
        </Map>
      </div>
    </>
  );
}

export default MapCity;