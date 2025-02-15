import React from 'react'
import { Routes, Route } from 'react-router-dom';
import UserSignIn from './components/UserSignIn';
import AdminLogin from './components/AdminLogin';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashBoard';
import Home from './components/Home';
import Attendance from './components/Attendance';
const App=()=>{
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/adminLogin" element={<AdminLogin/>}/>
        <Route path="/AdminDashboard" element={<AdminDashboard/>}/>
        <Route path="/UserSignIn" element={<UserSignIn/>}/>
        <Route path="/UserProfile" element={<UserProfile/>}/>
        <Route path="/Attendance" element={<Attendance/>}/>
      </Routes>
  )
}
export default App;