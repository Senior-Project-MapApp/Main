import React, {useState} from "react";
import { Grid, Box, Avatar, Divider, List, ListItem, ListItemText, ListItemButton, Tooltip } from "@mui/material";
import { green } from "@mui/material/colors";
import ProfileStat from "./profileStat";
import ProfileAccount from "./profileAccount";
import Settings from "./settings";

function Profile ({data}) {

    const [showStat, setShowStat] = useState(0);
    const [showSetting, setShowSetting] = useState(0);
    const [showAccount, setShowAccount] = useState(1);

    function handleStatClick(){
        if(showStat === 0){
            setShowAccount(0);
            setShowSetting(0);
            setShowStat(1);
        }
    }

    function handleAccountClick(){
        if(showAccount === 0){
            setShowStat(0);
            setShowSetting(0);
            setShowAccount(1);
        }
    }

    function handleSettingsClick(){
        if(showSetting === 0){
            setShowStat(0);
            setShowAccount(0);
            setShowSetting(1);
        }
    }

    return (
        <>
        <Navbar data={data}/>
            <Grid container direction={"row"} sx={{ margin: "2%", marginTop: "2%"}}>
                <Box sx={{width: "20%"}}>
                    <Tooltip title={data.userName}>
                        <Avatar variant="circular" sx={{bgcolor: green[900], margin: "auto", width: 200, height: 200}}></Avatar>
                    </Tooltip>
                    <List sx={{marginTop: "5%"}}>
                        <Divider variant="middle"/>
                        <ListItem>
                            <ListItemButton>
                                <ListItemText primary="Acount" onClick={handleAccountClick}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="middle"/>
                        <ListItem>
                            <ListItemButton>
                                <ListItemText primary="Stats" onClick={handleStatClick}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="middle"/>
                        <ListItem>
                            <ListItemButton>
                                <ListItemText primary="Settings" onClick={handleSettingsClick}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider variant="middle"/>
                    </List>
                </Box>
                <Divider orientation="vertical" flexItem />
                {showStat === 1 ? <ProfileStat data={data}/> : <></>}
                {showAccount === 1 ? <ProfileAccount data={data}/> : <></>}
                {showSetting === 1 ? <Settings data={data}/> : <></>}
            </Grid>
        </>
    );
}

export default Profile;