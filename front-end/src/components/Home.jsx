import React, { useState } from 'react';
import { LockOpen, UserPlus, UserCheck, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col items-center justify-center p-4">
      {/* Attendance Marking System Header */}
      <div className="bg-white shadow-xl rounded-lg p-6 mb-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 flex items-center justify-center">
          <UserCheck className="mr-3" />
          Attendance Management System
        </h1>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-gray-700">
            Track and manage attendance with ease and precision
          </p>
        </div>
      </div>

      {/* Login Options */}
      <div className="w-full max-w-md space-y-4">
        {/* Admin Login */}
        <div 
          onClick={() => {
            navigate('/AdminLogin')
          }}
          className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition-all flex items-center justify-between"
        >
          <div className="flex items-center">
            <KeyRound className="text-red-500 mr-4" />
            <span className="text-xl font-semibold text-gray-800">
              Log in as Admin
            </span>
          </div>
          <LockOpen className="text-gray-500" />
        </div>

        {/* Staff Login */}
        <div 
          onClick={() => {
            navigate('/UserSignIn')
          }}
          className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-xl transition-all flex items-center justify-between"
        >
          <div className="flex items-center">
            <UserPlus className="text-green-500 mr-4" />
            <span className="text-xl font-semibold text-gray-800">
              Log in as Staff
            </span>
          </div>
          <LockOpen className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default Home;