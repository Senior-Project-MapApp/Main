import Home from "./home";
import Map from "./map";
import Calendar from "./calendar";
import Profile from "./profile";
import { Routes, Route, Navigate, BrowserRouter, Link } from 'react-router-dom';

function Navbar () {
    return (
    <>       
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/mapview" element={<Map/>}/>
            <Route path="calendarview" element={<Calendar/>}/>
            <Route path="profile" element={<Profile/>}/>
        </Routes>

    <Link to="/home">Home</Link>
    <Link to="/mapview">Map</Link>
    <Link to="/calendarview">Cal</Link>
    <Link to="/profile">Profile</Link>
    </>
    );
}

export default Navbar;