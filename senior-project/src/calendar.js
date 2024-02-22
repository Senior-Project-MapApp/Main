import React, {useState} from "react";
import { Grid, Box, Button } from "@mui/material";
import TableGraph from "./tableGraph";
import { Navigate } from "react-router-dom";
import AddTaskIcon from '@mui/icons-material/AddTask';
import NewTaskModal from "./createNewTask";

function Calendar ({data, sign}) {

    const [nTask, setNTask] = useState(false);

    const handleOpenModal = () => {
        setNTask(true);
    };
  
    const handleClose = () => {
        setNTask(false);
    }

    if(sign){
        return (
            <>
            <Grid container direction={"row"}>
                <Box sx={{width: "60%"}}>
                    <Button sx={{marginTop: "3%", marginLeft: "84%"}} variant="contained" endIcon={<AddTaskIcon/>} onClick={handleOpenModal}>New Task</Button>
                    <NewTaskModal open={nTask} handleClose={handleClose}/>
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