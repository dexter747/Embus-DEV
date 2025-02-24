'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Search, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import type { Map as LeafletMap } from 'leaflet';
import L from 'leaflet';

// Add this near the top of the file
const DEBOUNCE_DELAY = 300; // Reduce debounce delay
const SEARCH_MIN_LENGTH = 2; // Reduce minimum search length

// Fix Leaflet marker icon
const markerIcon = L.icon({
  iconUrl: '/marker-icon.png', // Add these images to your public folder
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { 
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    )
  }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

interface Location {
  name: string;
  address: string;
  coordinates: [number, number];
}

interface SearchLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: Location) => void;
  type: 'from' | 'to';
  colors: {
    primaryGreen: string;
    darkText: string;
  };
}

const SearchLocationModal = ({ isOpen, onClose, onSelect, type, colors }: SearchLocationModalProps) => {
  const [search, setSearch] = useState('');
  // Initialize results as an empty array
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  // Add map state
  const [map, setMap] = useState<L.Map | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Update the searchLocations function
  const searchLocations = async (query: string) => {
    if (query.length < SEARCH_MIN_LENGTH) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=in`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Ensure data is an array before mapping
      if (Array.isArray(data)) {
        const formattedResults: Location[] = data.map((item: any) => ({
          name: item.display_name.split(',')[0],
          address: item.display_name,
          coordinates: [parseFloat(item.lat), parseFloat(item.lon)]
        }));
        setResults(formattedResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Add debounce effect for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        searchLocations(search);
      } else {
        setResults([]);
      }
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [search]);

  // Update map center when location is selected
  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      mapRef.current.setView(selectedLocation.coordinates, 13);
    }
  }, [selectedLocation]);

  if (!isOpen) return null;

  // Update the main modal container and content styling
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-5xl h-[80vh] flex flex-col"> 
        {/* Header - remains same */}
        <div className="p-4 border-b flex-shrink-0 flex items-center justify-between">
          <h2 className="text-xl font-chillax font-semibold" style={{ color: colors.darkText }}>
            Select {type === 'from' ? 'Pickup' : 'Drop-off'} Location
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Input - add flex-shrink-0 */}
        <div className="p-4 border-b flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg text-gray-900 font-medium"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {/* Content - update with flex-1 and min-height-0 */}
        <div className="flex-1 flex min-h-0">
          {/* Results List - update with overflow handling */}
          <div className="w-full md:w-2/5 border-r overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : (
              <div className="divide-y overflow-y-auto">
                {results.map((result, idx) => (
                  <button
                    key={idx}
                    className="w-full p-4 text-left hover:bg-gray-50 flex items-start gap-3"
                    onClick={() => setSelectedLocation(result)}
                  >
                    <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">
                        {result.name}
                      </p>
                      <p className="text-sm text-gray-600">{result.address}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Map View - remains same */}
          <div className="hidden md:block flex-1 relative bg-gray-50">
            <div className="absolute inset-0 m-4">
              {typeof window !== 'undefined' && (
                <MapView selectedLocation={selectedLocation} />
              )}
            </div>
          </div>
        </div>

        {/* Footer - add flex-shrink-0 */}
        <div className="p-4 border-t flex-shrink-0">
          <button
            className="w-full py-3 rounded-lg text-white font-medium disabled:opacity-50"
            style={{ backgroundColor: colors.primaryGreen }}
            onClick={() => {
              if (selectedLocation) {
                onSelect(selectedLocation);
                onClose();
              }
            }}
            disabled={!selectedLocation}
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
};

// Update the map view component
const MapView = ({ selectedLocation }: { selectedLocation: Location | null }) => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      mapRef.current.setView(selectedLocation.coordinates, 13, { animate: true });
    }
  }, [selectedLocation]);

  return (
    <MapContainer
      center={selectedLocation?.coordinates || [20.5937, 78.9629]}
      zoom={selectedLocation ? 13 : 5}
      className="h-full w-full"
      ref={mapRef}
      zoomControl={false} // Disable default zoom controls
      attributionControl={false} // Disable attribution
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {selectedLocation && (
        <Marker position={selectedLocation.coordinates} icon={markerIcon}>
        </Marker>
      )}
    </MapContainer>
  );
};

export default SearchLocationModal;