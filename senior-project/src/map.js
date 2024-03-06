import React, { useEffect, useState } from 'react';
import { Grid, Box, Button, Typography } from "@mui/material";
import MapGraph from "./mapGraph";
import AddTaskIcon from '@mui/icons-material/AddTask';
import MapIcon from '@mui/icons-material/Map';
import PlaceIcon from '@mui/icons-material/Place';
import QRCode from 'qrcode.react';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import { Navigate } from "react-router-dom";
import NewTaskModal from './createNewTask';

function Map({data, sign, db, user}) {
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [nTask, setNTask] = useState(false);

  const handleOpenModal = () => {
      setNTask(true);
  };

  const handleClose = () => {
      setNTask(false);
  }

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: { lat: 47.4914, lng: -117.5853 }, // Default center coordinates
        zoom: 10,
      };
      const mapElement = document.getElementById('map');
      const newMap = new window.google.maps.Map(mapElement, mapOptions);
      const newDirectionsService = new window.google.maps.DirectionsService();
      const newDirectionsRenderer = new window.google.maps.DirectionsRenderer();
      newDirectionsRenderer.setMap(newMap);

      const input = document.getElementById('search-input');
      const newSearchBox = new window.google.maps.places.SearchBox(input);

      newSearchBox.addListener('places_changed', () => {
        const newPlaces = newSearchBox.getPlaces();
        if (newPlaces.length > 0) {
          const place = newPlaces[0];
          setSelectedPlace(place);
        }
      });

      setMap(newMap);
      setSearchBox(newSearchBox);
      setDirectionsService(newDirectionsService);
      setDirectionsRenderer(newDirectionsRenderer);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLocation);
          newMap.setCenter(userLocation);
          new window.google.maps.Marker({
            position: userLocation,
            map: newMap,
            title: "Your Location",
          });
        });
      }
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      if (map) {
        map.setMap(null);
      }
      if (searchBox) {
        searchBox.removeListener('places_changed');
      }
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }
    };
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    if (searchInput && map) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: searchInput }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const result = results[0];
          const location = result.geometry.location;
          map.setCenter(location);
          map.setZoom(15);
          setSelectedPlace({
            name: result.formatted_address,
            geometry: { location: location }
          });
        }
      });
    }
  };

  const handleGo = () => {
    if (userLocation && selectedPlace && directionsService && directionsRenderer) {
      const origin = userLocation;
      const destination = selectedPlace.geometry.location;

      directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      }, (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
          const route = response.routes[0];
          setDistance(route.legs[0].distance.text);
          setDuration(route.legs[0].duration.text);

          const destinationLat = destination.lat();
          const destinationLng = destination.lng();
          const googleMapsLink = `https://www.google.com/maps?q=${destinationLat},${destinationLng}`;
          setGoogleMapsUrl(googleMapsLink);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  };

  if(sign){
    return (
      <div>
        <input
          id="search-input"
          type="text"
          placeholder="Search for a place"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Find</button> 
        <button onClick={handleGo}>Get Directions</button> 

        <div id="map" style={{ width: '100%', height: '400px' }}></div>
        {selectedPlace && (
          <div>
            <h2>Selected Place:</h2>
            <p>Name: {selectedPlace.name}</p>
            <p>Latitude: {selectedPlace.geometry.location.lat()}</p>
            <p>Longitude: {selectedPlace.geometry.location.lng()}</p>
            {distance && duration && (
              <div>
                <Grid container direction={"row"} columnGap={2} sx={{margin: "1%"}}>
                  <DirectionsCarFilledIcon/>
                  <Typography>Distance: {distance}</Typography>
                </Grid>
                <Grid container direction={"row"} columnGap={2} sx={{margin: "1%"}}>
                  <AccessTimeIcon/>
                  <Typography>Duration: {duration}</Typography>
                </Grid>
                <Grid container direction={"row"} columnGap={2} sx={{margin: "1%"}}>
                  <LinkIcon/>
                  <Typography>Google Maps Link: <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></Typography>
                </Grid>
                <QRCode value={googleMapsUrl} size={128} level={"H"} />
              </div>
            )}
          </div>
        )}
        <Grid container direction={"row"}>
              <Box sx={{width: "60%"}}>
                  <Button sx={{marginTop: "3%", marginLeft: "84%"}} variant="contained" endIcon={<AddTaskIcon/>} onClick={handleOpenModal}>New Task</Button>
                  <NewTaskModal open={nTask} handleClose={handleClose} db={db} user={user}/>
              </Box>
              <Box sx={{width: "40%"}}>
                  <MapGraph data={data}/>
              </Box>
          </Grid>
      </div>
    );
  }
  else{
    return <Navigate replace to="/"/>
  }
}

export default Map;


