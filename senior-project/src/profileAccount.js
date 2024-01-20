import React from "react";
import { Grid, Box, Typography, Button} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ProfileAccount({data}){
    return(
        <>
        <Box container="true" direction={"column"} sx={{width: "70%", marginLeft: "5%"}}> 
            <Typography variant="h3">{data.userName}</Typography>
            <Typography variant="caption">Joined: {data.joined}</Typography>
            <Grid container direction={"column"} rowGap={2} sx={{marginTop: "5%"}}> 
                <Typography>Email: </Typography>
                <Button sx={{maxWidth: "20%"}} variant="contained">Change Email</Button>
                <Button sx={{maxWidth: "20%"}} variant="contained">Change Password</Button>
                <Button sx={{maxWidth: "30%"}} variant="contained" startIcon={<AccountCircleIcon/>}>Change Profile Picture</Button>
            </Grid>
        </Box>
        </>
    )
}

export default ProfileAccount;