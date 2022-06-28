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
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default App;
