import React from "react";
import { Grid, Box, Avatar, Typography } from "@mui/material";
import { green } from "@mui/material/colors";

function Profile ({data}) {
    return (
        <>
            <Grid container direction={"row"}>
            <Box sx={{ margin: "2%",marginTop: "5%"}}>
                <Avatar variant="rounded" sx={{bgcolor: green[900], width: 100, height: 100}}></Avatar>
                <Typography variant="h4">{data.userName}</Typography>
            </Box>
                <Box>
                </Box>
            </Grid>
        </>
    );
}

export default Profile;