import Home from "./home";
import Map from "./map";
import Calendar from "./calendar";
import Profile from "./profile";
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Box, Grid, Button, Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { green } from "@mui/material/colors";
import logo from "./images/logo.png";


function Navbar () {
    return (
    <>
    <Box sx={{flexGrow: 1}} >
        <AppBar position="static">
        <Grid container direction={"row"} justifyContent={"flex-end"} alignItems={"center"} >
            <Toolbar sx={{position: "absolute", left: 1}}>
                <img src={logo} style={{height: 40}}/>
                <IconButton color="secondary" size="large" edge="start" sx={{ml: 1}}>
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
            <Button to="/home" LinkComponent={Link} color="secondary" >Home</Button>
            <Button to="/mapview" LinkComponent={Link} color="secondary" >Map</Button>
            <Button to="/calendarview" LinkComponent={Link} color="secondary" >Calendar</Button>
            <Button to="/profile" LinkComponent={Link} color="secondary" >Profile</Button>
            <Avatar sx={{bgcolor: green[900], margin: 1}}></Avatar>
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