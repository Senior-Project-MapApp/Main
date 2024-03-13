import React, {QRCode, useEffect, useState } from 'react';
import { Grid, Box, Button, Typography, TextField } from "@mui/material";
import TableGraph from "./tableGraph";
import AddTaskIcon from '@mui/icons-material/AddTask';
import MapIcon from '@mui/icons-material/Map';
import PlaceIcon from '@mui/icons-material/Place';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LinkIcon from '@mui/icons-material/Link';
import { Navigate } from "react-router-dom";
import NewTaskModal from './createNewTask';

function Map({data, sign, db, user, task}) {
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState(data?.waypoints || []); 
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: data?.initialCenter || { lat: 47.4914, lng: -117.5853 }, 
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
        const places = newSearchBox.getPlaces();
        if (places.length === 0) {
          return;
        }
        setSelectedPlace(places[0]);
      });

      setMap(newMap);
      setSearchBox(newSearchBox);
      setDirectionsService(newDirectionsService);
      setDirectionsRenderer(newDirectionsRenderer);
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    console.log(`API Key: ${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`);
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      directionsRenderer?.setMap(null);
    };
  }, [data]); 

  //REMOVE AT RELEASE JUST FOR TESTING PURPOSES
  const handleUseMyLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setStartLocation(pos);
        map.setCenter(pos);

       
        if (window.userLocationMarker) {
          window.userLocationMarker.setMap(null);
        }

        
        const marker = new window.google.maps.Marker({
          position: pos,
          map: map,
          title: "Your Location",
        });

       
        window.userLocationMarker = marker;

      },
      () => {
        alert("The Geolocation service failed.");
      }
    );
  } else {
    alert("Your browser doesn't support geolocation.");
  }
};


  const handleSetAsStart = () => {
    if (selectedPlace) {
      setStartLocation(selectedPlace.geometry.location);
    } else {
      alert("Please search for a location first.");
    }
  };

  const handleSetAsDestination = () => {
    if (selectedPlace) {
      setDestination(selectedPlace);
      setGoogleMapsUrl(`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.geometry.location.lat()},${selectedPlace.geometry.location.lng()}`);
    } else {
      alert("Please search for a location first.");
    }
  };

  const handleAddWaypoint = () => {
    if (selectedPlace) {
      setWaypoints([...waypoints, { location: selectedPlace.geometry.location, stopover: true }]);
    } else {
      alert("Please search for a location first.");
    }
  };

  const handleGetDirections = () => {
    if (!startLocation || !destination) {
      alert("Please set both a start location and a destination.");
      return;
    }

    const request = {
      origin: startLocation,
      destination: destination.geometry.location,
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        const leg = result.routes[0].legs[0];
        setDistance(leg.distance.text);
        setDuration(leg.duration.text);
      } else {
        alert(`Directions request failed due to ${status}`);
      }
    });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  if(sign){
    return (
      <>
        <Grid container direction={"row"}>
          <Box sx={{width: "60%"}}>
          <Grid container direction={"column"} rowGap={1}>
              <Grid sx={{margin: "2%"}} container direction={"row"} columnGap={3}>
                <TextField
                  id="search-input"
                  type="text"
                  label="Search for a place"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <Button variant="contained" onClick={handleGetDirections}>Get Directions</Button> 
                <Button sx={{marginLeft: "37%"}} variant="contained" endIcon={<AddTaskIcon/>}>New Task</Button>
              </Grid>
              <Grid sx={{margin: "2%"}} container direction={"row"} columnGap={3}>
                <Button variant="contained" onClick={handleUseMyLocation}>Use My Location</Button>
                <Button variant="contained" onClick={handleSetAsStart}>Set as Start</Button>
                <Button variant="contained" onClick={handleSetAsDestination}>Set as Destination</Button>
                <Button variant="contained" onClick={handleAddWaypoint}>Add Waypoint</Button>
    
              </Grid>
            </Grid>
            <div id="map" style={{ width: '100%', height: '100%' }}></div>
            {selectedPlace && (
              <Grid container direction={"column"} sx={{margin: "5%"}}>
                <Grid container direction={"row"} columnGap={2} sx={{margin: "1%"}}>
                  <PlaceIcon fontSize='large'/>
                  <Typography variant='h5'>{selectedPlace.name}</Typography>
                </Grid>
                <Grid container direction={"row"} columnGap={2} sx={{margin: "1%"}}>
                  <MapIcon/>
                  <Typography>Latitude / Longitude: {selectedPlace.geometry.location.lat()}, {selectedPlace.geometry.location.lng()}</Typography>
                </Grid>
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
              </Grid>
            )}
          </Box>
          <Box sx={{width: "40%"}}>
              <TableGraph data={task}/>
          </Box>
        </Grid>
      </>
    
      );
  }
  else{
    return <Navigate replace to="/"/>
  }
}

export default Map;


