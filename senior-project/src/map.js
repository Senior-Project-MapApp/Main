import React from "react";
import { Grid, Box } from "@mui/material";
import MapGraph from "./mapGraph";
import data from "./example.json";

function Map () {
    return (
        <>
        <Grid container direction={"row"}>
            <Box sx={{width: "60%"}}>
                
            </Box>
            <Box sx={{width: "40%"}}>
                <MapGraph data={data}/>
            </Box>
        </Grid>
        </>
    );
}

export default Map;