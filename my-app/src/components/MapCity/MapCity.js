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
  const [closeWindow, setCloseWindow] = React.useState(true);
  const [count, setCount] = React.useState(0);

  const [text, setText] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [list, setList] = React.useState("");

  const handleClick = (event) => {
    setCloseWindow(closeWindow => true);
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    const left = event.point.x;
    const top = event.point.y;
    console.log(event);
    setCount(count => count + 1);
    console.log(count)
    setMarkers(markers => [...markers,{long:longitude, lat:latitude, left:left, top:top}]);
    console.log(markers);
  };
  const handleClickButton =(event) => {
    setCloseWindow(closeWindow => false);
    markers.pop();
    setCount(count => 0);
    console.log(closeWindow);
  };

  const handleChangeText =(event) => {
    setText(text => event.target.value);
    console.log(text);
  };

  const handleChangeDescription =(event) => {
    setDescription(description => event.target.value);
    console.log(description);
  };

  const handleChangeList =(event) => {
    setList(list => event.target.value);
    console.log(list);
  };


  const handleSubmit =(event) => {
   event.preventDefault();
   localStorage.setItem('textState', text);
   localStorage.setItem('descriptionState', description);
   localStorage.setItem('listState', list);
   console.log(localStorage.getItem('listState'));
  };

  

  const counter = (count) => {
    if (count > 1) {
      return false;
    } else { return true};
  };

  
  return (
    <>
      <h1 className="text-3xl ml-[2%] mt-[1%]">Contacts</h1>
      <div className="w-[70%] h-[800px] ml-[2%] mt-[2%]  border-4 border-black">
        <Map
         onClick={count < 1 ? handleClick : undefined }
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
          { counter(count) && closeWindow && 
            markers.map((coordinate) => (  
              <>     
              <Marker longitude={coordinate.long} latitude={coordinate.lat} color="red" />
               <div className="absolute z-10 text-sm bg-gray-200 border-2 border-black w-[220px] h-[270px]" style={{position:'absolute', left:`${coordinate.left +"px"}` ,top:`${coordinate.top+"px"}`}}>
               <button onClick={handleClickButton} className='ml-[200px]'>X</button>
               <form className='flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor="Nom">Nom</label>
                    <input type="text" className='mt-[10px] w-[90%] mx-auto' onChange={handleChangeText}/>
                <label htmlFor="Description" className='mt-[10px]'>Description</label>
                    <textarea id="Description" onChange={handleChangeDescription} name="Description" className="mt-[10px] w-[90%] mx-auto">
                    </textarea>
                <select name="type" onChange={handleChangeList} className="mt-[20px] w-[90%] mx-auto h-[25px]">
                    <option value="">--Choisir une option--</option>
                    <option value="Entreprise">Entreprise</option>
                    <option value="Particulier">Particulier</option>
                    <option value="Collectivité">Collectivité</option>
                  </select>
                  <input type="submit" value="Ajouter" className="border-1 border-black bg-blue-600 h-[30px] w-[100px] mx-auto mt-[20px]"/>
               </form >
              </div>
              </>
            ))
           }  
          <GeolocateControl />
          <div>
          </div>
        </Map>
      </div>
    </>
  );
}

export default MapCity;