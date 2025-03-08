'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MapPin, User, ChevronDown, Menu, X } from 'lucide-react'; // Add these imports

interface NavbarProps {
  colors: {
    primaryGreen: string;
    darkText: string;
  };
}

const Navbar = ({ colors }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isInterCity = pathname === '/intercity';
  const [location, setLocation] = useState("Locating...");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          try {
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=29a8d0f8953c4dd9916f235c1aefe163`
            );
            const data = await response.json();
            const city =
              data.results[0].components.city || data.results[0].components.town;
            setLocation(city);
          } catch {
            // 'error' removed since it's unused
            setLocation("Location unavailable");
          } finally {
            setLoading(false);
          }
        },
        () => {
          // Handle geolocation error (e.g., user denied permission)
          setLocation("Location unavailable");
          setLoading(false);
        }
      );
    } else {
      setLocation("Location unavailable");
      setLoading(false);
    }
  }, []);

  // Add to your navigation items
  const navigationItems = [
    { name: 'Home', href: '/landing' },
    { name: 'Help' },
    { name: 'Sign In', href: '/auth/signup' }
  ].map(item => (
    <button 
      key={item.name}
      className="px-3 py-1 rounded-md transition-colors font-medium hover:bg-gray-50"
      style={{ color: colors.darkText }}
      onClick={() => item.href && router.push(item.href)}
    >
      {item.name}
    </button>
  ));

  return (
    <nav style={{ backgroundColor: 'white' }} className="sticky top-0 z-50">
      <div className="w-full px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-8">
          <div 
            className="text-2xl md:text-3xl font-dm-sans font-bold cursor-pointer" 
            style={{ color: colors.primaryGreen }}
            onClick={() => router.push('/')}
          >
            embus
          </div>
          <button 
            className={`px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded-full transition-all duration-300 font-medium`}
            style={{ 
              backgroundColor: isInterCity ? colors.primaryGreen + '20' : 'transparent',
              color: isInterCity ? colors.primaryGreen : colors.darkText
            }}
            onClick={() => router.push(isInterCity ? '/' : '/intercity')}
          >
            {isInterCity ? 'Intra-City' : 'Inter-City'}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <button 
            className="p-2 active:bg-gray-50 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu 
              size={28} 
              style={{ color: colors.darkText }} 
              strokeWidth={2.5}
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100">
            <MapPin size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {loading ? (
                <span className="animate-pulse">●●●</span>
              ) : (
                location
              )}
            </span>
          </div>
          {/* Add Home button before Help */}
          {navigationItems}

          {/* Profile Section */}
          <div className="relative group">
            <button 
              className="flex items-center gap-2 px-3 py-1 rounded-md transition-colors font-medium"
              style={{ color: colors.darkText }}
            >
              <User size={18} />
              <span>Account</span>
              <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
            </button>
            
            {/* Hover Menu */}
            <div className="absolute right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
                <div className="flex items-center gap-3 pb-3 border-b">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium" style={{ color: colors.darkText }}>Guest User</p>
                    <p className="text-sm text-gray-500">guest@example.com</p>
                  </div>
                </div>
                
                <div className="py-2 space-y-1">
                  {[
                    'Your Trips',
                    'Saved Cards',
                    'Preferences',
                    'Help & Support'
                  ].map((item) => (
                    <button 
                      key={item}
                      className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-gray-50 transition-colors"
                      style={{ color: colors.darkText }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                
                <div className="pt-2 border-t">
                  <button 
                    className="w-full text-left px-2 py-1.5 rounded-md text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="p-4">
              <button 
                className="float-right p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} style={{ color: colors.darkText }} />
              </button>
              
              <div className="mt-16 space-y-4">
                <div className="flex items-center gap-2 p-4 rounded-lg bg-gray-50 border border-gray-200">
                  <MapPin size={20} style={{ color: colors.primaryGreen }} />
                  <span className="font-medium" style={{ color: colors.darkText }}>
                    {location}
                  </span>
                </div>
                
                {['Home', 'Help', 'Your Trips', 'Saved Cards', 'Preferences'].map(item => (
                  <button 
                    key={item}
                    className="w-full p-4 text-left rounded-lg hover:bg-gray-50 font-medium text-base active:bg-gray-100"
                    style={{ color: colors.darkText }}
                    onClick={() => item === 'Home' && router.push('/landing')}
                  >
                    {item}
                  </button>
                ))}
                
                <button 
                  className="w-full p-4 text-left rounded-lg font-medium text-base bg-red-50 hover:bg-red-100 text-red-600 active:bg-red-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;