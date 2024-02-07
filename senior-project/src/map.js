import React, { useEffect, useState } from 'react';
import { Grid, Box, Button, TextField, Typography } from "@mui/material";
import MapGraph from "./mapGraph";
import AddTaskIcon from '@mui/icons-material/AddTask';

function Map({data}) {
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

  return (
  <>
    <Grid container direction={"row"}>
      <Box sx={{width: "60%"}}>
        <Grid sx={{margin: "2%"}} container direction={"row"} columnGap={3}>
          <TextField
            id="search-input"
            type="text"
            label="Search for a place"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <Button variant="contained" onClick={handleSearch}>Find</Button> 
          <Button variant="contained" onClick={handleGo}>Get Directions</Button> 
          <Button sx={{marginLeft: "27%"}} variant="contained" endIcon={<AddTaskIcon/>}>New Task</Button>
        </Grid>
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
        {selectedPlace && (
          <div>
            <Typography variant='h2'>Selected Place:</Typography>
            <Typography>Name: {selectedPlace.name}</Typography>
            <Typography>Latitude: {selectedPlace.geometry.location.lat()}</Typography>
            <Typography>Longitude: {selectedPlace.geometry.location.lng()}</Typography>
            {distance && duration && (
              <div>
                <Typography>Distance: {distance}</Typography>
                <Typography>Duration: {duration}</Typography>
                <Typography>Google Maps Link: <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></Typography>
              </div>
            )}
          </div>
        )}
      </Box>
      <Box sx={{width: "40%"}}>
          <MapGraph data={data}/>
      </Box>
    </Grid>
  </>
  );
}

export default Map;


