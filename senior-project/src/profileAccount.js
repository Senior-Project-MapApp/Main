import React from "react";
import { Grid, Box, Typography, Button, TextField} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ProfileAccount({data}){
    return(
        <>
        <Box container="true" direction={"column"} sx={{width: "70%", marginLeft: "5%"}}> 
            <Typography variant="h3">{data.userName}</Typography>
            <Typography variant="caption">Joined: {data.joined}</Typography>
            <Typography variant="h5" sx={{marginTop: "5%"}}>Account Information:</Typography>
            <Grid container direction={"row"} columnGap={2} sx={{marginTop: "2%"}}> 
                <TextField label="Name" defaultValue={data.userName} sx={{width: "25ch"}}/>
                <TextField label="Email" defaultValue={"data.email"} sx={{width: "25ch"}}/>
            </Grid>
            <Grid container direction={"row"} columnGap={2} sx={{marginTop: "2%"}}> 
                <TextField label="Password" defaultValue={"data.password?"} sx={{width: "25ch"}}/>
                <TextField label="Birthday" defaultValue={"data.birthday?"} sx={{width: "25ch"}}/>
            </Grid>
            <Grid container direction={"row"} columnGap={2} sx={{marginTop: "2%"}}> 
                <Button variant="contained">Change Password</Button>
                <Button variant="contained">Change Avatar</Button>
            </Grid>
        </Box>
        </>
    )
}

export default ProfileAccount;