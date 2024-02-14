import React from 'react';
import QRCodeDisplay from 'QRCodeDisplay'; // Make sure this import path is correct

function Directions({ selectedPlace, distance, duration, googleMapsUrl }) {
  return (
    <div>
      {selectedPlace && (
        <>
          <h2>Selected Place:</h2>
          <p>Name: {selectedPlace.name}</p>
          <p>Latitude: {selectedPlace.geometry.location.lat()}</p>
          <p>Longitude: {selectedPlace.geometry.location.lng()}</p>
        </>
      )}
      {distance && duration && (
        <>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
          <p>Google Maps Link: <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
          <QRCodeDisplay url={googleMapsUrl} />
        </>
      )}
    </div>
  );
}

export default Directions;
