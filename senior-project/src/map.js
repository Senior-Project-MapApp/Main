import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

function MapWithSearch() {
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: { lat: 47.4914, lng: -117.5853 },
        zoom: 10,
      };
      const mapElement = document.getElementById('map');
      const newMap = new window.google.maps.Map(mapElement, mapOptions);

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

  const handleRequestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userLocation);
          map.setCenter(userLocation);
          new window.google.maps.Marker({
            position: userLocation,
            map: map,
            title: "Your Location",
          });
        }, 
        (error) => {
          console.error("Error fetching location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
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
      <button onClick={handleSearch}>Find</button>
      <button onClick={handleRequestLocation}>Use My Location</button>

      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {selectedPlace && (
        <div>
          <h2>Selected Place:</h2>
          <p>Name: {selectedPlace.name}</p>
          <p>Latitude: {selectedPlace.geometry.location.lat()}</p>
          <p>Longitude: {selectedPlace.geometry.location.lng()}</p>
          <p>Google Maps Link: <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
          <QRCode value={googleMapsUrl} size={256} level={"H"} />
        </div>
      )}
    </div>
  );
}

export default MapWithSearch;
