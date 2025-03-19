import React from "react";

interface Bus {
  name: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  travelTime: string;
  seatsAvailable: number;
  price: number;
  pickupPoints: string[];   // changed from string to array
  dropoffPoints: string[];  // added drop-off points separately
}

interface BusInfoCardProps {
  bus: Bus;
}

const BusInfoCard: React.FC<BusInfoCardProps> = ({ bus }) => {
  console.log("Bus Data:", bus); // Debugging: Log the bus data

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{bus.name}</h3>
        <span className="text-sm text-gray-600">{bus.type}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Departure Time</p>
          <p className="font-medium">{bus.departureTime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Arrival Time</p>
          <p className="font-medium">{bus.arrivalTime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Travel Time</p>
          <p className="font-medium">{bus.travelTime}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Seats Available</p>
          <p className="font-medium">{bus.seatsAvailable}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Ticket Price</p>
          <p className="font-medium">₹{bus.price}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Pick-Up Points</p>
          <ul className="list-disc ml-4">
            {bus.pickupPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm text-gray-600">Drop-Off Points</p>
          <ul className="list-disc ml-4">
            {bus.dropoffPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BusInfoCard;
