import React from "react";
import { Grid, Box, Typography} from "@mui/material";

function ProfileAccount({data}){
    return(
        <>
        <Box container="true" direction={"column"} sx={{width: "70%", marginLeft: "5%"}}> 
            <Typography variant="h3">{data.userName}</Typography>
            <Typography variant="caption">Joined: {data.joined}</Typography>
        </Box>
        </>
    )
}

export default ProfileAccount;