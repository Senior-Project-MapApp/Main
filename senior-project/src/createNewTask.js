import { Button, Dialog, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, { useState } from "react";

function NewTaskModal({open, handleClose}){

    const [date, setDate] = useState(new Date());

    return(
        <Dialog fullWidth onClose={handleClose} open={open}>
            <Grid container sx={{marginBottom: "5%"}} direction={"column"} justifyContent={"center"} alignItems={"center"} rowGap={8}>
                <DialogTitle color={"secondary"} variant="h4">Create New Task</DialogTitle>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Date to finish Task By:</Typography>
                    <DatePicker selected={date} onChange={(date) => setDate(date)}/>
                </Grid>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Task Name:</Typography>
                    <TextField color="secondary" variant="outlined" label="Task Name"/>
                </Grid>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Task Description:</Typography>
                    <TextField color="secondary" variant="outlined" label="Description"/>
                </Grid>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Task Location:</Typography>
                    <TextField color="secondary" variant="outlined" label="Location"/>
                </Grid>
                <Button variant="contained" type="submit" onClick={handleClose}>Create</Button>
            </Grid>
        </Dialog>
    );
}

export default NewTaskModal;