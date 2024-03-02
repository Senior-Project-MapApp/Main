import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

function Map({ data }) { // Accepting `data` as a prop
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [startLocation, setStartLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [waypoints, setWaypoints] = useState(data?.waypoints || []); // Initialize waypoints from data
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: data?.initialCenter || { lat: 47.4914, lng: -117.5853 }, // Use initialCenter from data if available
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
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      directionsRenderer?.setMap(null);
    };
  }, [data]); // Add `data` as a dependency to re-initialize if it changes

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

  return (
    <div>
      <input
        id="search-input"
        type="text"
        placeholder="Search for a place"
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleUseMyLocation}>Use My Location</button>
      <button onClick={handleSetAsStart}>Set as Start</button>
      <button onClick={handleSetAsDestination}>Set as Destination</button>
      <button onClick={handleAddWaypoint}>Add Waypoint</button>
      <button onClick={handleGetDirections}>Get Directions</button>

      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {destination && (
        <div>
          <h2>Destination:</h2>
          <p>Name: {destination.name}</p>
          <p>Latitude: {destination.geometry.location.lat()}</p>
          <p>Longitude: {destination.geometry.location.lng()}</p>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
          <p>Google Maps Link: <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
          <QRCode value={googleMapsUrl} size={128} level={"H"} />
        </div>
      )}
    </div>
  );
}

export default Map;
