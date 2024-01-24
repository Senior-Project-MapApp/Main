import React from "react";
import { Grid, Box, Typography, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import AssignmentIcon from '@mui/icons-material/Assignment';

function ProfileStat ({data}) {
    return(
        <>
        <Box container="true" direction={"column"} sx={{width: "70%", marginLeft: "5%"}}> 
            <Typography variant="h3">{data.userName}</Typography>
            <Typography variant="caption">Joined: {data.joined}</Typography>
            <Grid container direction={"column"} rowGap={2} sx={{marginTop: "5%"}}>
                <Typography variant="h4">Overall Statistics</Typography>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <LocationOnIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Number of Locations: ${data.numloc}`}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AssignmentIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Total Tasks: ${data.numTasks}`}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <CheckIcon/>
                        </ListItemIcon>
                        <ListItemText primary={`Done Tasks: ${data.doneTasks}`}/>
                    </ListItem>
                </List>
            </Grid> 
        </Box>
        </>
    );
}

export default ProfileStat;