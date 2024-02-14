import React, { useEffect, useRef } from 'react';

const Map = ({ onMapLoad }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapOptions = {
        center: { lat: 47.4914, lng: -117.5853 },
        zoom: 10,
      };
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      onMapLoad(map);
    };

    if (window.google) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }
  }, [onMapLoad]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
};

export default Map;
