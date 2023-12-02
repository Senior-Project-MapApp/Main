import React from "react";
import { Grid, Box, Avatar, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

function Profile ({data}) {
    return (
        <>
            <Grid container direction={"row"}>
                <Box sx={{width: "50%", margin : "2%"}}>
                    <Avatar sx={{bgcolor: green[900], margin: 1, width: "50%", height: "120%"}}></Avatar>
                    <Typography>{}</Typography>
                </Box>

            </Grid>
        </>
    );
}

export default Profile;