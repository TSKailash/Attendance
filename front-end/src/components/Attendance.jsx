import { useState, useEffect } from "react";

const TARGET_LOCATION = { lat: 12.840756053252106, lng: 80.15309570153114 }; 

const getDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; 
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

const Attendance = () => {
  const [username, setUsername] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [isInsideCampus, setIsInsideCampus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });

        const distance = getDistance(latitude, longitude, TARGET_LOCATION.lat, TARGET_LOCATION.lng);
        setIsInsideCampus(distance <= 1);
      },
      (err) => {
        setError("Failed to get location. Please allow location access.");
      }
    );
  }, []);

  const handleAttendance = () => {
    if (!isInsideCampus) {
      alert("You must be within the campus (1 km radius) to mark attendance.");
      return;
    }

    alert(`Attendance marked for ${username}`);
    // You can add API call to mark attendance here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mark Attendance</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {userLocation ? (
          <>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAttendance}
              className={`w-full p-3 mt-4 text-white font-bold rounded-lg transition-all 
              ${isInsideCampus ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={!isInsideCampus}
            >
              Proceed
            </button>
          </>
        ) : (
          <p className="text-gray-600">Fetching location...</p>
        )}
      </div>
    </div>
  );
};

export default Attendance;
