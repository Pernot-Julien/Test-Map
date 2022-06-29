import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './App.css';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(5.99804);
  const [lat, setLat] = useState(47.25218);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  mapboxgl.accessToken = 'pk.eyJ1Ijoicm91bGlvNTU1IiwiYSI6ImNsNHlsZDAwczIwcm4za21sZXlqc2hkMGEifQ.0ZWMXSk670FzzLM1gFR5kA';
  return (
    <div>
      <h1 className="text-5xl ml-[2%] mt-[1%]">Mes contacts</h1>
      <div className="w-full grid grid-cols-4 gap-4 mt-[2%] ml-[2%]">
        <div className="col-span-3">
          <div ref={mapContainer} className="border-4 border-black h-[800px]" />
        </div>
          <div className="mx-auto text-2xl">
            <table >
              <thead className="">
                <tr>
                  <th>Contacts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Item 1</td>
                </tr>
                <tr>
                  <td>Item 2</td>
                </tr>
                <tr>
                  <td>Item 3</td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default App;
