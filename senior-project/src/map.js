import React, { useEffect, useState } from 'react';

function MapWithSearch() {
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: { lat: 47.4914, lng: -117.5853 }, // Default center coordinates (e.g., Eastern Washington University)
        zoom: 10,
      };
      const mapElement = document.getElementById('map');

      const newMap = new window.google.maps.Map(mapElement, mapOptions);

      const input = document.getElementById('search-input');
      const newSearchBox = new window.google.maps.places.SearchBox(input);

      newSearchBox.addListener('places_changed', () => {
        const newPlaces = newSearchBox.getPlaces();
        setPlaces(newPlaces);

        if (newPlaces.length > 0) {
          const place = newPlaces[0];
          setSelectedPlace({
            name: place.name,
            location: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            },
          });
        }
      });

      setMap(newMap);
      setSearchBox(newSearchBox);
    };

    // Load the Google Maps JavaScript API with your API key from the environment variable
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
          map.setZoom(15); // You can adjust the zoom level as needed
          setSelectedPlace({
            name: result.formatted_address,
            location: {
              lat: location.lat(),
              lng: location.lng(),
            },
          });
        }
      });
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
      <button onClick={handleSearch}>Search</button>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {selectedPlace && (
        <div>
          <h2>Selected Place:</h2>
          <p>Name: {selectedPlace.name}</p>
          <p>Latitude: {selectedPlace.location.lat}</p>
          <p>Longitude: {selectedPlace.location.lng}</p>
        </div>
      )}
    </div>
  );
}

export default MapWithSearch;
