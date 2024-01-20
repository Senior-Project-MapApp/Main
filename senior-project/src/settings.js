import React from "react";
import { Grid, Box, Typography, Switch} from "@mui/material";

function Settings({data}){
    return(
        <>
        <Box container="true" direction={"column"} sx={{width: "70%", marginLeft: "5%"}}> 
            <Typography variant="h3">{data.userName}</Typography>
            <Typography variant="caption">Joined: {data.joined}</Typography>
            <Grid container direction={"column"} rowGap={2} sx={{marginTop: "5%"}}> 
                <Grid container direction={"row"} columnGap={2}>
                    <Typography>Allow Access to My Location</Typography> 
                    <Typography>Off</Typography>
                    <Switch color="secondary" defaultChecked></Switch>
                    <Typography>On</Typography>
                </Grid>
                <Grid container direction={"row"} columnGap={2}>
                    <Typography>Notifications</Typography>
                    <Typography>Off</Typography>
                    <Switch color="secondary" defaultChecked></Switch>
                    <Typography>On</Typography>
                </Grid>
                <Grid container direction={"row"} columnGap={2}>
                    <Typography>Snoozing Notifications</Typography>
                    <Typography>Off</Typography>
                    <Switch color="secondary" defaultChecked></Switch>
                    <Typography>On</Typography>
                </Grid>
                <Grid container direction={"row"} columnGap={2}>
                    <Typography>Friend Sharing</Typography>
                    <Typography>Off</Typography>
                    <Switch color="secondary" defaultChecked></Switch>
                    <Typography>On</Typography>
                </Grid>
                <Grid container direction={"row"} columnGap={2}>
                    <Typography>Repeating Tasks</Typography>
                    <Typography>Off</Typography>
                    <Switch color="secondary" defaultChecked></Switch>
                    <Typography>On</Typography>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}

export default Settings;