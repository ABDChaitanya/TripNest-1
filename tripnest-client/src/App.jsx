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
import './App.css'
function App() {
const[isLogin,setIslogin] = useState(false);
  return (
    <BrowserRouter>
    <Navbar isLogin={isLogin} setIslogin={setIslogin}/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/tours" element={<Tours/>} />
      <Route path="/tours/:id" element={<TourDetails/>} />  
      <Route path="/login" element={<Login isLogin={isLogin} setIslogin={setIslogin}/>} />  
      <Route path="/signup" element={<Signup/>} /> 
      <Route path="/profile" element={<Profile/>} /> 
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App
