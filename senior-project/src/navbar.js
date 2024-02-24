import React from "react";
import { Link } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Box, Grid, Button, Avatar, Tooltip } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { green } from "@mui/material/colors";
import logo from "./images/logo.png";


function Navbar ({user, HandleSignOut}) {

    return (
    <>
    <Box sx={{flexGrow: 1}} >
        <AppBar position="static">
        <Grid container direction={"row"} justifyContent={"flex-end"} alignItems={"center"} >
            <Toolbar sx={{position: "absolute", left: 1}}>
                <img src={logo} style={{height: 40}} alt="App logo"/>
                <Tooltip title="Menu">
                    <IconButton color="secondary" 
                                size="large" 
                                edge="start" 
                                sx={{ml: 1}}>
                        <MenuIcon/>
                    </IconButton>
                </Tooltip>
            </Toolbar>
            <Button to="/home" LinkComponent={Link} color="secondary" >Home</Button>
            <Button to="/mapview" LinkComponent={Link} color="secondary" >Map</Button>
            <Button to="/calendarview" LinkComponent={Link} color="secondary" >Calendar</Button>
            <Button to="/profile" LinkComponent={Link} color="secondary" >Profile</Button>
            <Button color="secondary" onClick={HandleSignOut}>Sign Out</Button>
            <Tooltip title={user.displayName}>
                <Avatar sx={{bgcolor: green[900], margin: 1}} src={user.photoURL}></Avatar>
            </Tooltip>
            </Grid>
        </AppBar>
    </Box>

    </>
    );
}

export default Navbar;