import { Button, Dialog, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, { useState } from "react";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

function NewTaskModal({open, handleClose, db, user}){

    const [date, setDate] = useState(new Date());
    const [startD, setStartD] = useState();
    const [endD, setEndD] = useState();

    const handleChange = (range) => {
        const [startD, endD] = range;
        setStartD(startD);
        setEndD(endD);
    };


    const createTask = () => {
        const reference = ref(db, 'users/' + user.uid + '/' + title);
        set(reference, {
            startDate: startD,
            endDate: endD,
            desc: description,
            loc: location
        }).catch((error) => {
            console.log(error);
        });
        handleClose();
    }

    return(
        <Dialog fullWidth onClose={handleClose} open={open}>
            <Grid container sx={{marginBottom: "5%"}} direction={"column"} justifyContent={"center"} alignItems={"center"} rowGap={8}>
                <DialogTitle color={"secondary"} variant="h4">Create New Task</DialogTitle>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Date Range of Task:</Typography>
                    <DatePicker selected={startD} onChange={handleChange} startDate={startD} endDate={endD} selectsRange/>
                </Grid>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Task Name:</Typography>
                    <TextField color="secondary" variant="outlined" label="Task Name"/>
                </Grid>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Task Description:</Typography>
                    <TextField multiline color="secondary" variant="outlined" label="Description"/>
                </Grid>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Task Location:</Typography>
                    <TextField color="secondary" variant="outlined" label="Location"/>
                </Grid>
                <Button variant="contained" type="submit" onClick={createTask}>Create</Button>
            </Grid>
        </Dialog>
    );
}

export default NewTaskModal;