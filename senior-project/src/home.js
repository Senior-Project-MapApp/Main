import React from "react";
import TableGraph from "./tableGraph";
import {Box, Grid, Button } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Navigate } from "react-router-dom";

function Home ({data, sign}) {
    if(sign){
        return(
            <Grid container direction={"row"}>
                <Box sx={{width: "85%", margin: "auto"}}>
                    <TableGraph data={data}/>
                </Box>
                <Box sx={{width: "11%", marginTop: "2%",}}>
                        <Button variant="contained" endIcon={<AddTaskIcon/>}>New Task</Button>
                </Box>
            </Grid>
        );
    }
    else{
        return <Navigate replace to="/"/>
    }
}

export default Home;