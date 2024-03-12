import { Button, Dialog, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import React, { useState } from "react";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"

function NewTaskModal({open, handleClose, db, user}){

    const [date, setDate] = useState(new Date());
    const [startD, setStartD] = useState();
    const [endD, setEndD] = useState();
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [coords, setCoords] = useState(null); 


    useEffect(() => {
        const loadGoogleMapsScript = () => {
            if (!document.querySelector('script[src="https://maps.googleapis.com/maps/api/js"]')) {
                const script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
                script.async = true;
                document.body.appendChild(script);
            }
        };

        loadGoogleMapsScript();
        return () => {
            const googleMapsScript = document.querySelector('script[src="https://maps.googleapis.com/maps/api/js"]');
            if (googleMapsScript) {
                googleMapsScript.remove();
            }
        };
    }, []);

    const handleChange = (range) => {
        const [startD, endD] = range;
        setStartD(startD);
        setEndD(endD);
    };

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
      };
      const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
      };
      const handleLocationChange = (e) => {
        setLocation(e.target.value);
      };

    const createTask = () => {

        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ 'address': location }, (results, status) => {
            if (status === 'OK') {
                const coordinates = results[0].geometry.location;
                const latLng = { lat: coordinates.lat(), lng: coordinates.lng() };
                setCoords(latLng);
        const reference = ref(db, 'users/' + user.uid + '/' + taskName);
        set(reference, {
            startDate: startD.toString(),
            endDate: endD.toString(),
            desc: description,
            loc: location,
            coords: latLng
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
                    <TextField color="secondary" variant="outlined" label="Task Name" onChange={handleTaskNameChange}/>
                </Grid>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Task Description:</Typography>
                    <TextField multiline color="secondary" variant="outlined" label="Description" onChange={handleDescriptionChange}/>
                </Grid>
                <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} columnGap={4}>
                    <Typography>Task Location:</Typography>
                    <TextField color="secondary" variant="outlined" label="Location" onChange={handleLocationChange}/>
                </Grid>
                <Button variant="contained" type="submit" onClick={createTask}>Create</Button>
            </Grid>
        </Dialog>
    );
}

export default NewTaskModal;