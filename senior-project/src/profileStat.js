import React from "react";
import { Grid, Box, Typography, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import AssignmentIcon from '@mui/icons-material/Assignment';

function ProfileStat ({data, user}) {
    return(
        <>
        <Box container="true" direction={"column"} sx={{width: "70%", marginLeft: "5%"}}> 
            <Typography variant="h3">{user.displayName}</Typography>
            <Typography variant="caption">Joined: {data.joined}</Typography>
            <Grid container direction={"column"} rowGap={2} sx={{marginTop: "5%"}}>
                <Typography variant="h4">Overall Statistics</Typography>
                <List sx={{width: "30%"}}>
                    <ListItem>
                        <ListItemIcon>
                            <LocationOnIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Number of Locations:"/>
                        <Typography>{data.numloc}</Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AssignmentIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Total Tasks: "/>
                        <Typography>{data.numTasks}</Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Done Tasks: "/>
                        <Typography>{data.doneTasks}</Typography>
                    </ListItem>
                </List>
            </Grid> 
        </Box>
        </>
    );
}

export default ProfileStat;