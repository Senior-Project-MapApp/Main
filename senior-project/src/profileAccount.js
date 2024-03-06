import React from "react";
import { Grid, Box, Typography, Button, TextField, InputAdornment, IconButton} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function ProfileAccount({data, user}){

    const [showPass, setShowPass] = React.useState(false);

    const handleClickShowPass = () => setShowPass(!showPass);

    return(
        <>
        <Box container="true" direction={"column"} sx={{width: "70%", marginLeft: "5%"}}> 
            <Typography variant="h3">{user.displayName}</Typography>
            <Typography variant="caption">Joined: {data.joined}</Typography>
            <Typography variant="h5" sx={{marginTop: "5%"}}>Account Information:</Typography>
            <Grid container direction={"row"} columnGap={2} sx={{marginTop: "2%"}}> 
                <TextField label="Name" defaultValue={user.displayName} sx={{width: "25ch"}}/>
                <TextField label="Email" defaultValue={user.email} sx={{width: "25ch"}}/>
            </Grid>
        </Box>
        </>
    )
}

export default ProfileAccount;