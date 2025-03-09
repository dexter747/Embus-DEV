'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Search, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';

// Add this near the top of the file
const DEBOUNCE_DELAY = 300; // Reduce debounce delay
const SEARCH_MIN_LENGTH = 2; // Reduce minimum search length

// Dynamically import the Map component with no SSR
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="h-full bg-gray-100 animate-pulse"></div>
});

interface Location {
  name: string;
  address: string;
  coordinates: [number, number];
}

// Define interface for OpenStreetMap API response
interface OpenStreetMapResult {
  display_name: string;
  lat: string;
  lon: string;
  [key: string]: unknown;
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
        const formattedResults: Location[] = data.map((item: OpenStreetMapResult) => ({
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className="bg-white rounded-xl w-full max-w-5xl h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          > 
            {/* Header with slide-down animation */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-4 border-b flex-shrink-0 flex items-center justify-between"
            >
              <h2 className="text-xl font-chillax font-semibold" style={{ color: colors.darkText }}>
                Select {type === 'from' ? 'Pickup' : 'Drop-off'} Location
              </h2>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </motion.button>
            </motion.div>

            {/* Search Input with fade-in animation */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-4 border-b flex-shrink-0"
            >
              <div className="relative">
                <motion.input
                  initial={{ width: "90%" }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                  type="text"
                  placeholder="Search for a location..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  autoFocus
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </motion.div>

            {/* Content with staggered children */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 flex min-h-0"
            >
              {/* Results List with staggered items */}
              <div className="w-full md:w-2/5 border-r overflow-y-auto">
                {loading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 text-center"
                  >
                    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                  </motion.div>
                ) : (
                  <div className="divide-y overflow-y-auto">
                    {results.map((result, idx) => (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                        className="w-full p-4 text-left hover:bg-gray-50 flex items-start gap-3"
                        onClick={() => setSelectedLocation(result)}
                      >
                        <MapPin className="text-gray-400 mt-1 flex-shrink-0" size={18} />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900">{result.name}</p>
                          <p className="text-sm text-gray-600">{result.address}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Map View with fade-in */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden md:block flex-1 relative bg-gray-50"
              >
                <div className="absolute inset-0 m-4">
                  {typeof window !== 'undefined' && (
                    <Map selectedLocation={selectedLocation} />
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Footer with slide-up animation */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="p-4 border-t flex-shrink-0"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 rounded-lg text-white font-medium disabled:opacity-50 transition-all"
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
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchLocationModal;