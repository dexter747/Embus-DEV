'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/navbar';
import SearchLocationModal from '@/components/SearchLocationModal';

const InterCityPage = () => {
  const [fromCity, setFromCity] = React.useState('');
  const [toCity, setToCity] = React.useState('');
  const [date, setDate] = React.useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchType, setSearchType] = useState<'from' | 'to'>('from');

  const colors = {
    primaryGreen: '#01DF73',
    secondaryGreen: '#C9E600',
    lightBg: '#F7FFF2',
    darkText: '#0E0E0E'
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=29a8d0f8953c4dd9916f235c1aefe163`
            );
            const data = await response.json();
            const city = data.results[0].components.city || data.results[0].components.town;
            setCurrentLocation(city);
            setFromCity(city); // Set the from city to current location
          } catch (error) {
            console.error('Error fetching location:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen font-dm-sans" style={{ backgroundColor: colors.lightBg }}>
      <Navbar colors={colors} />
        <div className="relative">
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(to right, ${colors.primaryGreen}, ${colors.secondaryGreen})`,
          opacity: 0.95
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <h1 className="text-6xl md:text-7xl font-chillax font-semibold text-white text-center mb-12">
            Inter-City Travel
          </h1>
          
          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { 
                  label: 'From', 
                  value: fromCity, 
                  setter: setFromCity, 
                  placeholder: currentLocation || 'Select departure city' 
                },
                { 
                  label: 'To', 
                  value: toCity, 
                  setter: setToCity, 
                  placeholder: 'Select destination city' 
                },
                { 
                  label: 'Date', 
                  value: date, 
                  setter: setDate, 
                  type: 'date' 
                }
              ].map((field) => (
                <div key={field.label} className="flex flex-col">
                  <label className="text-sm font-chillax font-medium mb-2" style={{ color: colors.darkText }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.type ? 'Select date' : field.placeholder}
                    className="p-3 border rounded-lg font-dm-sans placeholder:text-gray-400"
                    style={{ 
                      borderColor: '#E2E8F0',
                      color: colors.darkText 
                    }}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    readOnly={!field.type} // Make location inputs read-only
                    onClick={() => {
                      if (!field.type) { // Only for location fields
                        setSearchType(field.label.toLowerCase() as 'from' | 'to');
                        setIsSearchModalOpen(true);
                      }
                    }}
                  />
                </div>
              ))} 
            </div>
            <button 
              className="w-full mt-6 py-4 rounded-lg flex items-center justify-center gap-2 text-white font-chillax font-medium text-lg transition-transform hover:scale-[1.02] "
              style={{ backgroundColor: colors.primaryGreen }}
            >
              <Search size={24} />
              SEARCH BUSES
            </button>
          </div>
        </div>
      </div>

      {/* Add the modal component */}
      <SearchLocationModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelect={(location) => {
          if (searchType === 'from') {
            setFromCity(location.name);
          } else {
            setToCity(location.name);
          }
        }}
        type={searchType}
        colors={colors}
      />

      {/* Trending Offers Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-chillax font-semibold" style={{ color: colors.darkText }}>
            POPULAR ROUTES
          </h2>
          <button 
            className="font-medium hover:underline"
            style={{ color: colors.primaryGreen }}
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Mumbai - Pune', icon: '🚌', color: colors.primaryGreen, 
              desc: 'Starting from ₹350' },
            { title: 'Delhi - Chandigarh', icon: '🚍', color: colors.secondaryGreen,
              desc: 'Starting from ₹450' },
            { title: 'Bangalore - Chennai', icon: '🚐', color: colors.primaryGreen,
              desc: 'Starting from ₹600' }
          ].map((offer, idx) => (
            <div 
              key={idx}
              className="rounded-xl p-6 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer group"
              style={{ 
                backgroundColor: `${offer.color}10`,
                transform: 'translateY(0)'
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-chillax font-semibold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{ backgroundColor: offer.color }}
                >
                  {offer.icon}
                </div>
                <div>
                  <h3 
                    className="font-chillax font-bold mb-2 text-lg transition-all duration-300 group-hover:text-xl" 
                    style={{ color: colors.darkText }}
                  >
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800">
                    {offer.desc}
                  </p>
                  <p className="text-xs text-gray-500 mt-2 transition-all duration-300 group-hover:text-gray-700">
                    Multiple departures daily
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="text-center max-w-2xl mx-auto px-4">
          <h2 
            className="text-2xl md:text-2xl font-chillax font-semibold"
            style={{ color: colors.primaryGreen }}
          >
            Apno ko, Sapno ko Kareeb Laaye.
          </h2>
        </div>
      </footer>
    </div>
  );
};

export default InterCityPage;