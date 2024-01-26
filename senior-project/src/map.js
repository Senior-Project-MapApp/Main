import React from "react";
import { Grid, Box, Button } from "@mui/material";
import MapGraph from "./mapGraph";
import AddTaskIcon from '@mui/icons-material/AddTask';

function Map ({data}) {
    return (
        <>
        <Grid container direction={"row"}>
            <Box sx={{width: "60%"}}>
                <Button sx={{marginTop: "65%", marginLeft: "84%"}} variant="contained" endIcon={<AddTaskIcon/>}>New Task</Button>
            </Box>
            <Box sx={{width: "40%"}}>
                <MapGraph data={data}/>
            </Box>
        </Grid>
        </>
    );
}

export default Map;