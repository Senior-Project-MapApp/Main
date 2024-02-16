import React from "react";
import { Grid, Box, Button } from "@mui/material";
import TableGraph from "./tableGraph";
import { Navigate } from "react-router-dom";
import AddTaskIcon from '@mui/icons-material/AddTask';

function Calendar ({data, sign}) {
    if(sign){
        return (
            <>
            <Grid container direction={"row"}>
                <Box sx={{width: "60%"}}>
                    <Button sx={{marginTop: "3%", marginLeft: "80%"}} variant="contained" endIcon={<AddTaskIcon/>}>New Task</Button>
                </Box>
                <Box sx={{width: "40%"}}>
                    <TableGraph data={data}/>
                </Box>
            </Grid>
            </>
        );
    }
    else{
        return <Navigate replace to="/"/>
    }
}

export default Calendar;