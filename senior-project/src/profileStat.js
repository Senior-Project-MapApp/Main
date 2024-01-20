import React from "react";
import { Grid, Box, Typography} from "@mui/material";
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
                <Grid container direction={"row"}>
                    <LocationOnIcon/>
                    <Typography>Number of Locations: {data.numloc}</Typography>
                </Grid>
                <Grid container direction={"row"}>
                    <AssignmentIcon/>
                    <Typography>Total Tasks: {data.numTasks}</Typography>
                </Grid>
                <Grid container direction={"row"}>
                    <CheckIcon/>
                    <Typography>Done Tasks: {data.doneTasks}</Typography>
                </Grid>
            </Grid> 
        </Box>
        </>
    );
}

export default ProfileStat;