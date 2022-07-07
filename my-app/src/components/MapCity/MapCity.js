import * as React from 'react';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import redMarker from '../../assets/images/red_marker.png'

const MAPBOX_TOKEN = 'pk.eyJ1Ijoicm91bGlvNTU1IiwiYSI6ImNsNTB4dmI0bzAwZDQzaW15NGgyb3RneDEifQ.epmA_h4FwLOoZLymM0uZtw'; // Set your mapbox token here
// fonction qui sert à afficher ma carte 
function MapCity() {
  const [viewport, setViewport] = React.useState({

  });
// mes différents state
  const [markers, setMarkers] = React.useState([]);
  const [closeWindow, setCloseWindow] = React.useState(true);
  const [count, setCount] = React.useState(0);

  const [text, setText] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [list, setList] = React.useState("");


// ajoute un marker au click sur la carte
  const handleClick = (event) => {
    setCloseWindow(closeWindow => true);
    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;
    const left = event.point.x;
    const top = event.point.y;
    const title = localStorage.getItem('textState');
    setCount(count => count + 1);
    setMarkers(markers => [...markers,{long:longitude, lat:latitude, left:left, top:top, title:title}]);
  };
// gère la fermeture de la fenêtre associée au marker
  const handleClickButton =(event) => {
    setCloseWindow(closeWindow => false);
    markers.pop();
    setCount(count => 0);
  };
// affiche la saisie utilisateur le champ text
  const handleChangeText =(event) => {
    setText(text => event.target.value);
  };
// affiche la saisie utilisateur le champ description
  const handleChangeDescription =(event) => {
    setDescription(description => event.target.value);
  };
// affiche le choix de l'utilisateur parmis les éléments de la liste
  const handleChangeList =(event) => {
    setList(list => event.target.value);
  };
//conserve dans un nouveau tableau les valeurs du dernier marker affiché
  const markersLastElement =[ markers[markers.length - 1]];

// soumet le formulaire avec enregistrements des données en localstorage
  const handleSubmit =(event) => {
   event.preventDefault();
   localStorage.setItem('textState', text);
   localStorage.setItem('descriptionState', description);
   localStorage.setItem('listState', list);
   localStorage.setItem('markers', JSON.stringify(markers));
   setCount(count => 0);
   setCloseWindow(window =>false);
  };

//Si le compteur est supérieur à 1 on ne peut ajouter un autre markeur sur la map (il faut soit valider celui en cours ou fermé la fenêtre )
  const counter = (count) => {
    if (count < 1) {
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
        <Marker longitude={-113.31} latitude={53.01} color="red"><img src={redMarker} alt="" className="w-[40px] translate-y-[-14px]"  /><p className="absolute top-[50%] left-[20px]">Titre à dynamiser</p></Marker>
        <Marker longitude={6.002154} latitude={47.240724} color="red"><img src={redMarker} alt="" className="w-[40px] translate-y-[-14px]"  /><p className="absolute top-[50%] left-[20px]">Titre à dynamiser</p></Marker>
        <Marker longitude={132.047449} latitude={67.233789} color="red"><img src={redMarker} alt="" className="w-[40px] translate-y-[-14px]"  /><p className="absolute top-[50%] left-[20px]">Titre à dynamiser</p></Marker>
        
          {  markers.map((coordinate) => (  
            <>     
            <Marker longitude={coordinate.long } latitude={coordinate.lat} color="red"><p className="absolute top-[50%] left-[20px]">Titre à dynamiser</p><img src={redMarker} alt="" className="w-[40px] translate-y-[-15px]"  /></Marker>
            </>
          ))}
          {markersLastElement.map((coordinate) =>( counter(count) && closeWindow && 
            <div className="absolute z-10 text-sm bg-gray-200 border-2 border-black w-[220px] h-[270px]" style={{position:'absolute', left:`${coordinate.left +"px"}` ,top:`${coordinate.top+"px"}`}}>
              <button onClick={handleClickButton} className='ml-[200px]'>X</button>
              <form className='flex flex-col' onSubmit={handleSubmit}>
                <label htmlFor="Nom">Nom</label>
                    <input type="text" className='mt-[10px] w-[90%] mx-auto' required="required" onChange={handleChangeText}/>
                <label htmlFor="Description" className='mt-[10px]'>Description</label>
                    <textarea id="Description" onChange={handleChangeDescription} name="Description" className="mt-[10px] w-[90%] mx-auto">
                    </textarea>
                <select name="type" onChange={handleChangeList} required="required" className="mt-[20px] w-[90%] mx-auto h-[25px]">
                    <option value="">--Choisir une option--</option>
                    <option value="Entreprise">Entreprise</option>
                    <option value="Particulier">Particulier</option>
                    <option value="Collectivité">Collectivité</option>
                    </select>
                    <input type="submit" value="Ajouter" className="border-1 border-black bg-blue-600 h-[30px] w-[100px] mx-auto mt-[20px]"/>
                </form >
              </div>))}
        </Map>
       
      </div>
    </>
  );
}

export default MapCity;
