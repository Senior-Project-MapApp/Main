import React from "react";
import TableGraph from "./tableGraph";
import {Box, Grid, Button } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';

function Home ({data}) {
    return(
        <Grid container direction={"row"}>
            <Box container sx={{width: "85%", margin: "auto"}}>
                <TableGraph data={data}/>
            </Box>
            <Box container sx={{width: "11%", marginTop: "2%",}}>
                    <Button variant="contained" endIcon={<AddTaskIcon/>}>New Task</Button>
            </Box>
        </Grid>
    );
}

export default Home;