import Home from "./home";
import Map from "./map";
import Calendar from "./calendar";
import Profile from "./profile";
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Box, Grid } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

function Navbar () {
    return (
    <>      
    <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
        <Grid container direction={"row"} justifyContent={"flex-start"} alignItems={"center"} >
            <Toolbar>
                <IconButton size="large" edge="start" color="green" sx={{mr: 2}}>
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
            <Link hrefLang="/home" underline="hover" >Home</Link>
            <Link to="/mapview">Map</Link>
            <Link to="/calendarview">Cal</Link>
            <Link to="/profile">Profile</Link>
            </Grid>
        </AppBar>
    </Box>
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