'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from '@/components/navbar';
import SearchLocationModal from '@/components/SearchLocationModal';

const LandingPage = () => {
  const [fromCity, setFromCity] = React.useState('');
  const [toCity, setToCity] = React.useState('');
  const [date, setDate] = React.useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchType, setSearchType] = useState<'from' | 'to'>('from');
  const [isInterCity, setIsInterCity] = useState(false);

  const colors = {
    primaryGreen: '#01DF73',
    secondaryGreen: '#C9E600',
    lightBg: '#F7FFF2',
    darkText: '#0E0E0E'
  };

  return (
    <div className="min-h-screen font-dm-sans" style={{ backgroundColor: colors.lightBg }}>
      <Navbar colors={colors} />
      <div className="relative">
        <div className="absolute inset-0" style={{ 
          background: `linear-gradient(to right, ${colors.primaryGreen}, ${colors.secondaryGreen})`,
          opacity: 0.95
        }}></div>

        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-16 lg:py-24">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-chillax font-semibold text-white text-center mb-6 md:mb-12">
            {isInterCity ? 'Inter-City Travel' : 'embus'}
          </h1>
          
          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-xl p-4 md:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { label: 'From', value: fromCity, setter: setFromCity, placeholder: 'Select area' },
                { label: 'To', value: toCity, setter: setToCity, placeholder: 'Select destination' },
                { label: 'Date', value: date, setter: setDate, type: 'date' }
              ].map((field) => (
                <div key={field.label} className="flex flex-col">
                  <label className="text-sm font-chillax font-semibold mb-2 text-gray-900">
                    {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.type ? 'Select date' : field.placeholder}
                    className="p-3 md:p-4 border rounded-lg font-dm-sans text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    style={{ 
                      borderColor: '#E2E8F0',
                      color: colors.darkText 
                    }}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    readOnly={!field.type}
                    onClick={() => {
                      if (!field.type) {
                        setSearchType(field.label.toLowerCase() as 'from' | 'to');
                        setIsSearchModalOpen(true);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
            
            {/* Search Button */}
            <button
              className="w-full mt-4 md:mt-6 py-3 md:py-4 rounded-lg bg-primary text-white font-medium text-base md:text-lg transition-transform active:scale-[0.99] hover:shadow-lg"
              style={{ backgroundColor: colors.primaryGreen }}
            >
              Search Buses
            </button>
          </div>
        </div>
      </div>

      {/* Trending Offers Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <h2 className="text-2xl md:text-3xl font-chillax font-bold mb-6 md:mb-8 text-gray-900">
          TRENDING OFFERS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            { title: 'First Time User', icon: '1st', color: colors.primaryGreen, 
              desc: 'Save up to ₹250 on your first booking' },
            { title: 'Weekend Special', icon: '%', color: colors.secondaryGreen,
              desc: 'Get 15% off on weekend trips' },
            { title: 'Student Discount', icon: '₹', color: colors.primaryGreen,
              desc: 'Special rates for students' }
          ].map((offer, idx) => (
            <div 
              key={idx}
              className="rounded-xl p-4 md:p-6 transition-all duration-300 active:scale-[0.98] md:hover:scale-[1.03] cursor-pointer group"
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
                    Valid till 28 Feb
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Buses Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-chillax font-bold" style={{ color: colors.darkText }}>
            UPCOMING BUSES IN YOUR AREA
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            { 
              route: 'Route 27B',
              from: 'Indiranagar',
              to: 'Whitefield',
              time: '10:30 AM',
              eta: '15 mins',
              type: 'AC Electric',
              seats: '12 seats available'
            },
            { 
              route: 'Route 500D',
              from: 'JP Nagar',
              to: 'Electronic City',
              time: '11:00 AM',
              eta: '20 mins',
              type: 'Non-AC',
              seats: '8 seats available'
            },
            { 
              route: 'Route 335E',
              from: 'Koramangala',
              to: 'MG Road',
              time: '11:15 AM',
              eta: '10 mins',
              type: 'AC Electric',
              seats: '15 seats available'
            }
          ].map((bus, idx) => (
            <div 
              key={idx}
              className="rounded-xl p-4 md:p-6 border border-gray-100 bg-white shadow-sm transition-all duration-300 active:scale-[0.98] md:hover:scale-[1.03] cursor-pointer group"
              style={{ 
                backgroundColor: idx % 2 === 0 ? `${colors.primaryGreen}10` : `${colors.secondaryGreen}10`,
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-chillax font-bold text-lg transition-all duration-300 group-hover:text-xl" 
                    style={{ color: colors.darkText }}>
                  {bus.route}
                </h3>
                <span className="px-3 py-1 rounded-full text-sm transition-all duration-300 group-hover:scale-110" 
                      style={{ 
                        backgroundColor: colors.secondaryGreen + '30',
                        color: colors.darkText 
                      }}>
                  {bus.eta}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800">
                  <span className="font-medium">From:</span> {bus.from}
                </p>
                <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800">
                  <span className="font-medium">To:</span> {bus.to}
                </p>
                <p className="text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-800">
                  <span className="font-medium">Departure:</span> {bus.time}
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <span className="text-sm text-gray-500 transition-all duration-300 group-hover:text-gray-700">
                  {bus.type}
                </span>
                <span className="text-sm font-medium transition-all duration-300 group-hover:scale-105" 
                      style={{ color: colors.secondaryGreen }}>
                  {bus.seats}
                </span>
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
    </div>
  );
};

export default LandingPage;