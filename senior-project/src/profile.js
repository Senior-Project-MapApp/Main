import React from "react";
import { Grid, Box, Avatar, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckIcon from '@mui/icons-material/Check';
import AssignmentIcon from '@mui/icons-material/Assignment';

function Profile ({data}) {
    return (
        <>
            <Grid container direction={"row"}>
                <Box container direction={"row"} sx={{ margin: "2%", marginTop: "5%"}}>
                    <Avatar variant="circular" sx={{bgcolor: green[900], marginBottom: "5%", width: 200, height: 200}}></Avatar>
                    <Grid container direction={"column"}>
                        <Typography variant="h4">{data.userName}</Typography>
                        <Typography>{data.joined}</Typography>
                    </Grid>
                </Box>
                <Grid container direction={"column"} alignItems={"center"} justifyContent={"center"} sx={{margin: "5%"}}>
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
            </Grid>
        </>
    );
}

export default Profile;