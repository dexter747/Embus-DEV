'use client';

import { useState } from 'react';
import { FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Define the Bus interface
interface Bus {
  id: number;
  name: string;
  from: string;
  to: string;
  date: string;
  time: string;
  seats: number;
  pickup: string;
  dropoff: string;
  price: number;
}

export default function InterCityPage() {
  const [fromCity, setFromCity] = useState('Pune');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('morning');
  const [minSeats, setMinSeats] = useState(3);
  const [pickupPoint, setPickupPoint] = useState('');
  const [dropoffPoint, setDropoffPoint] = useState('');
  const [searchResults, setSearchResults] = useState<Bus[]>([]);

  // Bus Data
  const busData: Bus[] = [
    { id: 1, name: "Express Voyager", from: "Pune", to: "Mumbai", date: "2025-03-20", time: "morning", seats: 5, pickup: "Station 1", dropoff: "Station A", price: 500 },
    { id: 2, name: "City Transatron", from: "Pune", to: "Mumbai", date: "2025-03-20", time: "afternoon", seats: 3, pickup: "Station 2", dropoff: "Station B", price: 450 },
    { id: 3, name: "Skyline Shuttle", from: "Pune", to: "Bangalore", date: "2025-03-20", time: "evening", seats: 8, pickup: "Station 1", dropoff: "Station A", price: 700 },
    { id: 4, name: "Metro Mover", from: "Pune", to: "Delhi", date: "2025-03-20", time: "morning", seats: 2, pickup: "Station 2", dropoff: "Station B", price: 900 },
    { id: 5, name: "Urban Glide", from: "Pune", to: "Mumbai", date: "2025-03-21", time: "morning", seats: 6, pickup: "Station 1", dropoff: "Station A", price: 520 },
    { id: 6, name: "Starline Express", from: "Pune", to: "Bangalore", date: "2025-03-21", time: "afternoon", seats: 4, pickup: "Station 2", dropoff: "Station B", price: 680 },
    { id: 7, name: "Elite Transatron", from: "Pune", to: "Delhi", date: "2025-03-21", time: "evening", seats: 7, pickup: "Station 1", dropoff: "Station A", price: 920 },
    { id: 8, name: "Swift Voyager", from: "Pune", to: "Mumbai", date: "2025-03-22", time: "morning", seats: 3, pickup: "Station 2", dropoff: "Station B", price: 480 },
    { id: 9, name: "Horizon Shuttle", from: "Pune", to: "Bangalore", date: "2025-03-22", time: "afternoon", seats: 5, pickup: "Station 1", dropoff: "Station A", price: 710 },
    { id: 10, name: "Nexus Mover", from: "Pune", to: "Delhi", date: "2025-03-22", time: "evening", seats: 6, pickup: "Station 2", dropoff: "Station B", price: 880 },
    { id: 11, name: "Luxe Transatron", from: "Pune", to: "Mumbai", date: "2025-03-20", time: "morning", seats: 4, pickup: "Station 1", dropoff: "Station A", price: 510 },
    { id: 12, name: "Eco Voyager", from: "Pune", to: "Mumbai", date: "2025-03-20", time: "afternoon", seats: 2, pickup: "Station 2", dropoff: "Station B", price: 460 },
    { id: 13, name: "Greenline Shuttle", from: "Pune", to: "Bangalore", date: "2025-03-20", time: "evening", seats: 9, pickup: "Station 1", dropoff: "Station A", price: 720 },
    { id: 14, name: "Rapid Mover", from: "Pune", to: "Delhi", date: "2025-03-20", time: "morning", seats: 3, pickup: "Station 2", dropoff: "Station B", price: 910 },
    { id: 15, name: "Comfort Glide", from: "Pune", to: "Mumbai", date: "2025-03-21", time: "morning", seats: 7, pickup: "Station 1", dropoff: "Station A", price: 530 },
    { id: 16, name: "Sky Transatron", from: "Pune", to: "Bangalore", date: "2025-03-21", time: "afternoon", seats: 5, pickup: "Station 2", dropoff: "Station B", price: 690 },
    { id: 17, name: "Prime Express", from: "Pune", to: "Delhi", date: "2025-03-21", time: "evening", seats: 8, pickup: "Station 1", dropoff: "Station A", price: 930 },
    { id: 18, name: "Urban Voyager", from: "Pune", to: "Mumbai", date: "2025-03-22", time: "morning", seats: 4, pickup: "Station 2", dropoff: "Station B", price: 490 },
    { id: 19, name: "Elite Shuttle", from: "Pune", to: "Bangalore", date: "2025-03-22", time: "afternoon", seats: 6, pickup: "Station 1", dropoff: "Station A", price: 730 },
    { id: 20, name: "Nexus Transatron", from: "Pune", to: "Delhi", date: "2025-03-22", time: "evening", seats: 5, pickup: "Station 2", dropoff: "Station B", price: 890 },
    { id: 21, name: "Luxe Voyager", from: "Pune", to: "Mumbai", date: "2025-03-20", time: "morning", seats: 6, pickup: "Station 1", dropoff: "Station A", price: 520 },
    { id: 22, name: "Eco Transatron", from: "Pune", to: "Mumbai", date: "2025-03-20", time: "afternoon", seats: 3, pickup: "Station 2", dropoff: "Station B", price: 470 },
    { id: 23, name: "Greenline Express", from: "Pune", to: "Bangalore", date: "2025-03-20", time: "evening", seats: 7, pickup: "Station 1", dropoff: "Station A", price: 740 },
    { id: 24, name: "Rapid Voyager", from: "Pune", to: "Delhi", date: "2025-03-20", time: "morning", seats: 4, pickup: "Station 2", dropoff: "Station B", price: 920 },
    { id: 25, name: "Comfort Transatron", from: "Pune", to: "Mumbai", date: "2025-03-21", time: "morning", seats: 5, pickup: "Station 1", dropoff: "Station A", price: 540 },
    { id: 26, name: "Skyline Express", from: "Pune", to: "Bangalore", date: "2025-03-21", time: "afternoon", seats: 6, pickup: "Station 2", dropoff: "Station B", price: 700 },
    { id: 27, name: "Prime Voyager", from: "Pune", to: "Delhi", date: "2025-03-21", time: "evening", seats: 9, pickup: "Station 1", dropoff: "Station A", price: 940 },
    { id: 28, name: "Urban Express", from: "Pune", to: "Mumbai", date: "2025-03-22", time: "morning", seats: 3, pickup: "Station 2", dropoff: "Station B", price: 500 },
    { id: 29, name: "Elite Transatron", from: "Pune", to: "Bangalore", date: "2025-03-22", time: "afternoon", seats: 7, pickup: "Station 1", dropoff: "Station A", price: 750 },
    { id: 30, name: "Nexus Voyager", from: "Pune", to: "Delhi", date: "2025-03-22", time: "evening", seats: 4, pickup: "Station 2", dropoff: "Station B", price: 900 },
    { id: 31, name: "Luxe Express", from: "Pune", to: "Mumbai", date: "2025-03-20", time: "morning", seats: 8, pickup: "Station 1", dropoff: "Station A", price: 550 },
    { id: 32, name: "Eco Shuttle", from: "Pune", to: "Mumbai", date: "2025-03-20", time: "afternoon", seats: 5, pickup: "Station 2", dropoff: "Station B", price: 480 },
    { id: 33, name: "Greenline Voyager", from: "Pune", to: "Bangalore", date: "2025-03-20", time: "evening", seats: 6, pickup: "Station 1", dropoff: "Station A", price: 760 },
    { id: 34, name: "Rapid Transatron", from: "Pune", to: "Delhi", date: "2025-03-20", time: "morning", seats: 3, pickup: "Station 2", dropoff: "Station B", price: 930 },
    { id: 35, name: "Comfort Express", from: "Pune", to: "Mumbai", date: "2025-03-21", time: "morning", seats: 4, pickup: "Station 1", dropoff: "Station A", price: 560 },
  ];

  // Search Functionality
  const handleSearch = () => {
    const filteredBuses = busData.filter((bus) => {
      return (
        (fromCity ? bus.from.toLowerCase() === fromCity.toLowerCase() : true) &&
        (toCity ? bus.to.toLowerCase() === toCity.toLowerCase() : true) &&
        (date ? bus.date === date : true) &&
        (time ? bus.time === time : true) &&
        (minSeats ? bus.seats >= minSeats : true) &&
        (pickupPoint ? bus.pickup === pickupPoint : true) &&
        (dropoffPoint ? bus.dropoff === dropoffPoint : true)
      );
    });
    setSearchResults(filteredBuses);
    console.log('Filtered Buses:', filteredBuses);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#01DF73] to-[#C9E600] flex flex-col items-center justify-start p-6">
      <div className="max-w-5xl w-full">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-[#0E0E0E] text-center mb-12 tracking-wide drop-shadow-lg"
        >
          Embark on Your Journey
        </motion.h1>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-white rounded-2xl shadow-xl"
        >
          {/* From City */}
          <div className="relative">
            <label className="block text-[#0E0E0E] text-sm font-medium mb-2">From</label>
            <motion.input
              type="text"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              placeholder="Enter starting city"
              className="w-full p-4 bg-[#F7FFF2] text-[#0E0E0E] placeholder-[#0E0E0E]/50 rounded-xl border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          {/* To City */}
          <div className="relative">
            <label className="block text-[#0E0E0E] text-sm font-medium mb-2">To</label>
            <motion.input
              type="text"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              placeholder="Select destination city"
              className="w-full p-4 bg-[#F7FFF2] text-[#0E0E0E] placeholder-[#0E0E0E]/50 rounded-xl border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          {/* Date with Icon */}
          <div className="relative">
            <label className="block text-[#0E0E0E] text-sm font-medium mb-2">Date</label>
            <div className="relative">
              <motion.input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 bg-[#F7FFF2] text-[#0E0E0E] placeholder-[#0E0E0E]/50 rounded-xl border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80"
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.05 }}
              />
              <FaCalendarAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#0E0E0E]/50" />
            </div>
          </div>

          {/* Departure Time */}
          <div className="relative">
            <label className="block text-[#0E0E0E] text-sm font-medium mb-2">Departure Time</label>
            <motion.select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-4 bg-[#F7FFF2] text-[#0E0E0E] placeholder-[#0E0E0E]/50 rounded-xl border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.05 }}
            >
              <option value="" disabled>Select time</option>
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="evening">Evening</option>
            </motion.select>
          </div>

          {/* Min Seats */}
          <div className="relative">
            <label className="block text-[#0E0E0E] text-sm font-medium mb-2">Min Seats</label>
            <motion.input
              type="number"
              value={minSeats}
              onChange={(e) => setMinSeats(Number(e.target.value))}
              min="1"
              className="w-full p-4 bg-[#F7FFF2] text-[#0E0E0E] placeholder-[#0E0E0E]/50 rounded-xl border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.05 }}
            />
          </div>

          {/* Pick-up Point */}
          <div className="relative">
            <label className="block text-[#0E0E0E] text-sm font-medium mb-2">Pick-up Point</label>
            <motion.select
              value={pickupPoint}
              onChange={(e) => setPickupPoint(e.target.value)}
              className="w-full p-4 bg-[#F7FFF2] text-[#0E0E0E] placeholder-[#0E0E0E]/50 rounded-xl border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.05 }}
            >
              <option value="" disabled>Select pick-up</option>
              <option value="Station 1">Station 1</option>
              <option value="Station 2">Station 2</option>
            </motion.select>
          </div>

          {/* Drop-off Point */}
          <div className="relative md:col-span-2">
            <label className="block text-[#0E0E0E] text-sm font-medium mb-2">Drop-off Point</label>
            <motion.select
              value={dropoffPoint}
              onChange={(e) => setDropoffPoint(e.target.value)}
              className="w-full p-4 bg-[#F7FFF2] text-[#0E0E0E] placeholder-[#0E0E0E]/50 rounded-xl border border-[#0E0E0E]/10 focus:outline-none focus:ring-2 focus:ring-[#01DF73] transition-all duration-300 hover:bg-[#F7FFF2]/80"
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.05 }}
            >
              <option value="" disabled>Select drop-off</option>
              <option value="Station A">Station A</option>
              <option value="Station B">Station B</option>
            </motion.select>
          </div>

          {/* Search Button with Icon */}
          <motion.button
            onClick={handleSearch}
            className="md:col-span-3 p-4 bg-gradient-to-r from-[#01DF73] to-[#C9E600] text-[#0E0E0E] font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSearch className="text-[#0E0E0E]" />
            Search Buses
          </motion.button>
        </motion.div>

        {/* Search Results */}
        <div className="mt-12">
          <AnimatePresence>
            {searchResults.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {searchResults.map((bus) => (
                  <motion.div
                    key={bus.id}
                    className="p-6 bg-white rounded-xl shadow-lg flex flex-col gap-4"
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-[#0E0E0E]">{bus.name}</h3>
                    <div className="flex justify-between text-[#0E0E0E]/80">
                      <p><span className="font-medium">Route:</span> {bus.from} → {bus.to}</p>
                      <p><span className="font-medium">Time:</span> {bus.time}</p>
                    </div>
                    <div className="flex justify-between text-[#0E0E0E]/80">
                      <p><span className="font-medium">Pickup:</span> {bus.pickup}</p>
                      <p><span className="font-medium">Dropoff:</span> {bus.dropoff}</p>
                    </div>
                    <div className="flex justify-between text-[#0E0E0E]/80">
                      <p><span className="font-medium">Seats Available:</span> {bus.seats}</p>
                      <p><span className="font-medium">Price:</span> ₹{bus.price}</p>
                    </div>
                    <motion.button
                      className="mt-4 p-3 bg-gradient-to-r from-[#01DF73] to-[#C9E600] text-[#0E0E0E] font-semibold rounded-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Book Now
                    </motion.button>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              searchResults.length === 0 && (fromCity || toCity || date || time || pickupPoint || dropoffPoint) && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-[#0E0E0E]/70 text-lg"
                >
                  No buses found for your search criteria.
                </motion.p>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}