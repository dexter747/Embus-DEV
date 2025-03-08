'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  selectedLocation: {
    coordinates: [number, number];
  } | null;
}

const Map = ({ selectedLocation }: MapProps) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const map = L.map('map').setView(
      selectedLocation?.coordinates || [20.5937, 78.9629],
      selectedLocation ? 13 : 5
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    if (selectedLocation) {
      L.marker(selectedLocation.coordinates).addTo(map);
    }

    return () => {
      map.remove();
    };
  }, [selectedLocation]);

  return <div id="map" className="h-full w-full rounded-lg" />;
};

export default Map;