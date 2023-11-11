import Home from "./home";
import Map from "./map";
import Calendar from "./calendar";
import Profile from "./profile";
import { Routes, Route, Link } from 'react-router-dom';

function Navbar () {
    return (
    <>       
    <Link to="/home">Home</Link>
    <Link to="/mapview">Map</Link>
    <Link to="/calendarview">Cal</Link>
    <Link to="/profile">Profile</Link>
    <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/mapview" element={<Map/>}/>
        <Route path="calendarview" element={<Calendar/>}/>
        <Route path="profile" element={<Profile/>}/>
    </Routes>

    </>
    );
}

export default Navbar;