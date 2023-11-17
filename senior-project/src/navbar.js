import Home from "./home";
import Map from "./map";
import Calendar from "./calendar";
import Profile from "./profile";
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar } from "@mui/material";

function Navbar () {
    return (
    <>       
    <AppBar position="static">
        <Toolbar>
            <IconButton size="large" edge="start" color="green">

            </IconButton>
        </Toolbar>
        <Link to="/home">Home</Link>
        <Link to="/mapview">Map</Link>
        <Link to="/calendarview">Cal</Link>
        <Link to="/profile">Profile</Link>

    </AppBar>
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