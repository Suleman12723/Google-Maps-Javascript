import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
    GoogleMap,
    Marker,
    DirectionsRenderer,
    Circle,
    Polygon,
    MarkerClusterer,
    

} from '@react-google-maps/api';

import {Places} from './Places';
import Distance from './Distance';







function Map() {

    const [markers, setMarkers] = useState([]);
    const [directions, setDirections] = useState();
    const [office, setOffice] = useState(); //
    const mapRef = useRef(); //mapRef: <GoogleMap>
    const center = useMemo(()=>(office ? office : {lat:43,lng:-80}),[office]); // <google.maps.LatLngLiteral>
    const options = useMemo(()=>({ //<MapOptions>
        disableDefaultUI: true,
        clickableIcons: false
    }),[])
    const [flag, setFlag] = useState(false);
    const [polygonCords, setPolygonCords] = useState([]);


    // const reload = Cutom();
    const onLoad = useCallback(map => (mapRef.current = map),[markers]);

    const houses = useMemo(()=>generateHouses(center),[center]);
    const fetchDirections =(house)=>{ //house: <LatLngLiteral>
        if(!office) return ;
        
        const service = new window.google.maps.DirectionsService();
        service.route({
            origin:house,
            destination:office,
            travelMode:window.google.maps.TravelMode.DRIVING
        },(result, status)=>{
            if(status === 'OK' && result){
                setDirections(result);
            }
        })
    }
    

    const handleMarkerRemover = (e)=>{
        const index = markers.indexOf(e);
        console.log(index);
        const array = markers;
        array.splice(index,1);
        setMarkers(array);
        setPolygonCords(array);
       setFlag(!flag)
    }
  return (
    <div className='container'>
        <div className='controls'>
            <h1>Commute?</h1>
            <Places setOffice={(position)=>{
                setOffice(position);
                mapRef.current?.panTo(position);
                }} />
                {!office && <p>Enter the address of your office</p>}
                {directions && <Distance leg={directions.routes[0].legs[0]} />}
        </div>
        <div className="map">
            <GoogleMap
            zoom={10} 
            center={center}
            mapContainerClassName='map-container'
            
            options={options}
            onLoad={onLoad}
            onClick={(e)=>{setMarkers([...markers,{lat:e.latLng.lat(),lng:e.latLng.lng()}]);setPolygonCords([...polygonCords,{lat:e.latLng.lat(),lng:e.latLng.lng()}])}}
            >
                {directions && <DirectionsRenderer directions={directions} options={{
                    polylineOptions:{
                        zIndex:50,
                        strokeColor:'#19762',
                        strokeWeight:5,
                    }
                }} />}
                 { markers.map((point)=><Marker position={point} onDblClick={()=>handleMarkerRemover(point)} />)}
                {office && 
                    
                    <>
                  
                    
                {/* </> */}
                    <Marker position={office} />
                <MarkerClusterer>
                    {clusterer =>houses.map(house => <Marker 
                    key={house.lat+house.lng} 
                    position={house}
                    label='car'
                   
                    clusterer={clusterer} 
                    onClick={()=>{
                        fetchDirections(house); //house: <LatLngLiteral>
                    }}
                    />) }
                </MarkerClusterer>

                
                { polygonCords.length >1 && <Polygon paths={polygonCords} options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35}} 
                    />
                }
                <Circle center={office} radius={15000} options={closeOptions} />
                <Circle center={office} radius={30000} options={middleOptiosn} />
                <Circle center={office} radius={45000} options={farOptions} />
                </>
}
             
                
            </GoogleMap>
        </div>
    </div>
  )
}

const defaultOptions = {
    strokeOpacity: 0.25,
    strokeWeight: 2,
    clickable:false,
    draggable:false,
    editable: false,
    visible: true,
}

const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: '#8BC34A',
    fillColor: '#8BC34A',
}
const middleOptiosn = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: '#FBC02D',
    fillColor: '#FB8C02D',
}

const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: '#FF5252',
    fillColor: '#FF5252',
}

const generateHouses = (position)=>{ //postion: google.maps.LatLngLiteral
    const houses = [];  //houses: Array<google.maps.LatLngLiteral>
    for(let i=0; i<50; i++){
        const direction = Math.random()< 0.5 ? -2 :2
        houses.push({
            lat:position.lat + Math.random() / direction,
            lng: position.lng + Math.random() / direction
        });
    }
    return houses;
};

export default Map