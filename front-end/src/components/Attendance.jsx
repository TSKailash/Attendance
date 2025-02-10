import React, { useState } from 'react';

const Attendance = () => {
  const [status, setStatus] = useState("idle");
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState({ title: "", message: "" });
  
  const ALLOWED_LOCATION = {
    latitude: 12.839952842521459,
    longitude: 80.15525117575505,
    radius: 100000
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * 
              Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const checkLocation = () => {
    setStatus("checking");
    
    setTimeout(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const distance = getDistance(
              latitude,
              longitude,
              ALLOWED_LOCATION.latitude,
              ALLOWED_LOCATION.longitude
            );

            if (distance <= ALLOWED_LOCATION.radius) {
              setStatus("success");
              setDialogContent({
                title: "Location Verified",
                message: "You are in the correct location. Attendance has been marked."
              });
            } else {
              setStatus("error");
              setDialogContent({
                title: "Location Error",
                message: "You are not in the designated area. Please move to the correct location."
              });
            }
            setShowDialog(true);
          },
          (error) => {
            setStatus("error");
            setDialogContent({
              title: "Location Error",
              message: `Unable to get location: ${error.message}`
            });
            setShowDialog(true);
          }
        );
      } else {
        setStatus("error");
        setDialogContent({
          title: "Not Supported",
          message: "Geolocation is not supported by your browser."
        });
        setShowDialog(true);
      }
    }, 2000);
  };

  const Dialog = ({ title, message }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Attendance System
          </h2>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col items-center justify-center">
            {status === "idle" && (
              <button
                onClick={checkLocation}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                disabled={status === "checking"}
              >
                Mark Attendance
              </button>
            )}
            
            {status === "checking" && (
              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="text-gray-600">Verifying your location...</p>
              </div>
            )}
            
            {status === "success" && (
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 mx-auto flex items-center justify-center">
                  <svg 
                    className="h-6 w-6 text-green-600" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="mt-4 text-green-600 font-medium">Location Verified</p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setShowDialog(false);
                  }}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Mark Another Attendance
                </button>
              </div>
            )}
            
            {status === "error" && (
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 mx-auto flex items-center justify-center">
                  <svg 
                    className="h-6 w-6 text-red-600" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="mt-4 text-red-600 font-medium">Location Error</p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setShowDialog(false);
                  }}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showDialog && (
        <Dialog title={dialogContent.title} message={dialogContent.message} />
      )}
    </div>
  );
};

export default Attendance;