'use client';

import React from 'react';
import Navbar from '@/components/navbar';
import { ArrowRight, Bus, Navigation2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();
  
  // Updated color theme with RGB values
  const colors = {
    primaryGreen: 'rgb(1, 223, 115)',    // #01DF73
    secondaryGreen: 'rgb(201, 230, 0)',  // #C9E600
    lightBg: '#F7FFF2',
    darkText: '#0E0E0E',
    // Additional theme colors
    primaryGreenLight: 'rgba(1, 223, 115, 0.1)',
    secondaryGreenLight: 'rgba(201, 230, 0, 0.1)',
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.lightBg }}>
      <Navbar colors={colors} />
      
      <main className="max-w-7xl mx-auto px-4 py-12 md:py-24">
        {/* Enhanced Hero Section */}
        <div className="relative py-16 md:py-24 mb-16 md:mb-24 rounded-3xl overflow-hidden">
          <div className="absolute inset-0" style={{ 
            background: `linear-gradient(135deg, 
              rgba(1, 223, 115, 0.15), 
              rgba(201, 230, 0, 0.2)
            )`
          }}></div>
          
          <div className="relative text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-chillax font-bold mb-6">
              <span className="bg-gradient-to-r from-[#01DF73] to-[#C9E600] bg-clip-text text-transparent">
                embus
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              
              Select the type of journey that suits your travel needs
            </p>
          </div>
        </div>

        {/* Journey Type Cards with Enhanced Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Intra-City Card */}
          <div 
            className="group rounded-2xl p-8 bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
            onClick={() => router.push('/')}
          >
            {/* Updated gradient circle */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full transition-transform duration-500 group-hover:scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${colors.primaryGreenLight}, ${colors.primaryGreen}20)`
              }}
            ></div>
            
            <Bus className="w-12 h-12 mb-6 transition-transform duration-300 group-hover:scale-110"
                 style={{ color: colors.primaryGreen }} />
            
            <h2 className="text-2xl font-chillax font-bold mb-4" style={{ color: colors.darkText }}>
              Intra-City Travel
            </h2>
            <p className="text-gray-600 mb-6">
              Perfect for daily commutes and getting around the city. Quick, convenient local bus services.
            </p>
            <button 
              className="flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
              style={{ color: colors.primaryGreen }}
            >
              Explore Routes 
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Inter-City Card */}
          <div 
            className="group rounded-2xl p-8 bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
            onClick={() => router.push('/intercity')}
          >
            {/* Updated gradient circle */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full transition-transform duration-500 group-hover:scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${colors.secondaryGreenLight}, ${colors.secondaryGreen}20)`
              }}
            ></div>
            
            <Navigation2 className="w-12 h-12 mb-6 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: colors.secondaryGreen }} />
            
            <h2 className="text-2xl font-chillax font-bold mb-4" style={{ color: colors.darkText }}>
              Inter-City Travel
            </h2>
            <p className="text-gray-600 mb-6">
              For traveling between cities. Comfortable, long-distance bus services with amenities.
            </p>
            <button 
              className="flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
              style={{ color: colors.secondaryGreen }}
            >
              Book Tickets 
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;