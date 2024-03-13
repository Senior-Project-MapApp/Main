import React, { useState }  from "react";
import TableGraph from "./tableGraph";
import {Box, Grid, Button } from "@mui/material";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Navigate } from "react-router-dom";
import NewTaskModal from "./createNewTask";

function Home ({data, sign, db, user, task}) {

    const [nTask, setNTask] = useState(false);

    const handleOpenModal = () => {
        setNTask(true);
    };

    const handleClose = () => {
        setNTask(false);
    }

    if(sign){
        return(
            <Grid container direction={"row"}>
                <Box sx={{width: "85%", margin: "auto"}}>
                    <TableGraph data={task}/>
                </Box>
                <Box sx={{width: "11%", marginTop: "2%",}}>
                        <Button variant="contained" endIcon={<AddTaskIcon/>} onClick={handleOpenModal}>New Task</Button>
                        <NewTaskModal open={nTask} handleClose={handleClose} db={db} user={user}/>
                </Box>
            </Grid>
        );
    }
    else{
        return <Navigate replace to="/"/>
    }
}

export default Home;