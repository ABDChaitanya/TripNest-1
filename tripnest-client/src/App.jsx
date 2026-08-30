import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Tours from './pages/Tours'
import TourDetails from './pages/TourDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Footer  from './../footer'
import Bookingsuccess from './components/Bookingsuccess'
import './App.css'
function App() {
const[isLogin,setIslogin] = useState(false);
const[loginId,setLoginId] = useState("");
  return (
    <BrowserRouter>
    <Navbar isLogin={isLogin} setIslogin={setIslogin}/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/tours" element={<Tours/>} />
      <Route path="/tours/:id" element={<TourDetails loginId={loginId}/>} />  
      <Route path="/login" element={<Login isLogin={isLogin} setLoginId={setLoginId} setIslogin={setIslogin}/>} />  
      <Route path="/signup" element={<Signup/>} /> 
      <Route path="/profile" element={<Profile loginId={loginId} isLogin={isLogin}/>} /> 
      <Route path="/bookings/booking-success/:id" element={<Bookingsuccess/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
