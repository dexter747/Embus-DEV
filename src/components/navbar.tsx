'use client'; // Mark as client-side component for static export compatibility

import { useEffect, useState, useRef } from 'react';
import { Search, MapPin, Menu, X, User } from 'lucide-react';
import Link from 'next/link';

// Define types for OpenCage API response
interface GeocodeResponse {
  results: {
    components: {
      city?: string;
      town?: string;
    };
  }[];
}

// Define navigation link type
interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  colors?: {
    primaryGreen: string;
    secondaryGreen: string;
    lightBg: string;
    darkText: string;
  };
}

export default function Navbar({ colors }: NavbarProps) {
  const [location, setLocation] = useState<string>('Loading...');
  const [loading, setLoading] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);

  // Navigation links
  const navLinks: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'Intercity', href: '/intercity' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  // Default colors if not provided
  const defaultColors = {
    primaryGreen: '#01DF73',
    secondaryGreen: '#C9E600',
    lightBg: '#F7FFF2',
    darkText: '#0E0E0E',
  };

  // Use provided colors or defaults
  const themeColors = colors || defaultColors;

  // Fetch geolocation on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !('geolocation' in navigator)) {
      setLocation('Geolocation not supported');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        try {
          const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY || '29a8d0f8953c4dd9916f235c1aefe163';
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=${apiKey}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch location data');
          }

          const data: GeocodeResponse = await response.json();
          const city =
            data.results[0]?.components.city ||
            data.results[0]?.components.town ||
            'Unknown';
          setLocation(city);
        } catch (error) {
          console.error('Error fetching location:', error);
          setLocation('Location unavailable');
        } finally {
          setLoading(false);
        }
      },
      (error: GeolocationPositionError) => {
        console.error('Geolocation error:', error.message);
        setLocation('Location unavailable');
        setLoading(false);
      },
      {
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery); // Replace with actual search logic
      setSearchQuery('');
    }
  };

  return (
    <nav
      className="shadow-lg sticky top-0 z-50"
      style={{ backgroundColor: themeColors.primaryGreen }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
              style={{ color: themeColors.darkText }}
            >
              Embus
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gray-300 transition-colors duration-200"
                style={{ color: themeColors.darkText }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search routes..."
                className="w-full p-2 pl-10 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </form>
          </div>

          {/* Location and User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} style={{ color: themeColors.darkText }} />
              {loading ? (
                <span className="animate-pulse" style={{ color: themeColors.darkText }}>
                  Loading...
                </span>
              ) : (
                <span style={{ color: themeColors.darkText }}>{location}</span>
              )}
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              style={{ color: themeColors.darkText }}
            >
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle menu"
              style={{ color: themeColors.darkText }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-gray-800 border-t border-gray-700 px-4 py-6 space-y-4"
          style={{ backgroundColor: themeColors.primaryGreen }}
        >
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search routes..."
              className="w-full p-2 pl-10 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </form>

          {/* Mobile Navigation Links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-lg hover:text-gray-300 transition-colors"
              style={{ color: themeColors.darkText }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Location */}
          <div className="flex items-center gap-2 py-2">
            <MapPin size={18} style={{ color: themeColors.darkText }} />
            {loading ? (
              <span className="animate-pulse" style={{ color: themeColors.darkText }}>
                Loading...
              </span>
            ) : (
              <span style={{ color: themeColors.darkText }}>{location}</span>
            )}
          </div>

          {/* Mobile User Menu */}
          <button
            className="flex items-center gap-2 py-2 hover:text-gray-300"
            style={{ color: themeColors.darkText }}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
        </div>
      )}
    </nav>
  );
}