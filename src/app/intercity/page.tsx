'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import Navbar from '@/components/navbar';
import dynamic from 'next/dynamic';
import Footer from '@/components/Footer';

const SearchLocationModal = dynamic(() => import('@/components/SearchLocationModal'), {
  ssr: false
});

const InterCityPage = () => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
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
    const getLocation = async () => {
      if (typeof window !== 'undefined' && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=29a8d0f8953c4dd9916f235c1aefe163`
              );
              const data = await response.json();
              const city = data.results[0].components.city || data.results[0].components.town;
              setCurrentLocation(city);
              setFromCity(city);
            } catch (error) {
              console.error('Error fetching location:', error);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    };
    
    getLocation();
  }, []);

  return (
    <div className="min-h-screen font-dm-sans" style={{ backgroundColor: colors.lightBg }}>
      <Navbar colors={colors} />
      
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0" 
          style={{ 
            background: `linear-gradient(to right, ${colors.primaryGreen}, ${colors.secondaryGreen})`,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="text-6xl md:text-7xl font-chillax font-semibold text-white text-center mb-12"
          >
            Inter-City Travel
          </motion.h1>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-xl p-8 max-w-4xl mx-auto"
          >
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
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-4 rounded-lg flex items-center justify-center gap-2 text-white font-chillax font-medium text-lg transition-all"
              style={{ backgroundColor: colors.primaryGreen }}
            >
              <Search size={24} />
              SEARCH BUSES
            </motion.button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 py-16"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <h2 className="text-2xl font-chillax font-semibold" style={{ color: colors.darkText }}>
            POPULAR ROUTES
          </h2>
          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            className="font-medium hover:underline flex items-center gap-2"
            style={{ color: colors.primaryGreen }}
          >
            View All
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              title: 'Mumbai - Pune',
              icon: '🚌',
              color: colors.primaryGreen,
              desc: 'Starting from ₹350',
              time: '2h 30m',
              frequency: '30+ buses daily'
            },
            { 
              title: 'Delhi - Chandigarh', 
              icon: '🚍', 
              color: colors.secondaryGreen,
              desc: 'Starting from ₹450',
              time: '4h 15m',
              frequency: '25+ buses daily'
            },
            { 
              title: 'Bangalore - Chennai', 
              icon: '🚐', 
              color: colors.primaryGreen,
              desc: 'Starting from ₹600',
              time: '5h 45m',
              frequency: '20+ buses daily'
            }
          ].map((route, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="rounded-xl p-6 cursor-pointer group bg-white shadow-lg border border-gray-100"
            >
              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  style={{ backgroundColor: route.color }}
                >
                  {route.icon}
                </motion.div>
                <div>
                  <h3 className="font-chillax font-bold text-lg mb-2" style={{ color: colors.darkText }}>
                    {route.title}
                  </h3>
                  <p className="text-sm text-gray-600">{route.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500">Journey time: {route.time}</span>
                    <span className="text-xs font-medium" style={{ color: colors.primaryGreen }}>
                      {route.frequency}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />

      {isSearchModalOpen && (
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
      )}
    </div>
  );
};

export default InterCityPage;