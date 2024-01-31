import React from "react";
import { Box, Typography, Switch, List, ListItem, ListItemText} from "@mui/material";

function Settings({data}){
    return(
        <>
        <Box container="true" direction={"column"} sx={{width: "70%", marginLeft: "5%"}}> 
            <Typography variant="h3">{data.userName}</Typography>
            <Typography variant="caption">Joined: {data.joined}</Typography>
            <List sx={{marginTop: "5%", width: "50%"}}> 
                <ListItem>
                        <ListItemText primary="Allow Access to My Location"/>
                        <Switch color="secondary" ></Switch>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Notifications"/>
                    <Switch color="secondary" ></Switch>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Snoozing"/>
                    <Switch color="secondary" ></Switch>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Friend Sharing"/>
                    <Switch color="secondary" ></Switch>
                </ListItem>
                <ListItem>
                    <ListItemText primary="Repeating Tasks"/>
                    <Switch color="secondary" ></Switch>
                </ListItem>
            </List>
        </Box>
        </>
    )
}

export default Settings;