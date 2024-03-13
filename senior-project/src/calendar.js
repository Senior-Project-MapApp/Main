import React from 'react';
import { useState, useCallback, useEffect, useRef } from "react";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { gapi } from "gapi-script";
import { Grid, Box, Button } from "@mui/material";
import TableGraph from "./tableGraph";
import AddTaskIcon from '@mui/icons-material/AddTask';

import App, { accessToken } from "./App.js";
import NewTaskModal from './createNewTask';

const locales = {
    "en-US": require("date-fns/locale/en-US")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

function Calendar1 ({user, db, sign, data, getAllTasks, getTask}) {
    const calendarID = user.email; 
    const ImportedAccessToken = accessToken;

    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" , description: "", id: "", color: "#c6e1a5"});
    const [allEvents, setAllEvents] = useState([]);
    const [selected, setSelected] = useState();
    const [nTask, setNTask] = useState(false);
    const [showList, setShowList] = useState(false);
    const [boxWidth, setBoxWidth] = useState(100);
    const [tasks, setTasks] = useState(getAllTasks(user, db))

    React.useEffect(() => { // shows or hides list on the right of screen
        handleAddEventsFromDB(); //gets all calendar events from db
        getEvents(); // gets all calendar events from Google
        if (showList === false) { //adjustsbox width 
            setBoxWidth(100);
        } else {
            setBoxWidth(70);
        }
    }, [showList]);

    const handleOpenModal = () => {
        setNTask(true);
    };
  
    const handleClose = () => {
        setNTask(false);
    }
  
    const handleSelectEvent = useCallback(
        (event) => {setSelected(event);
                    window.alert("Title: " + event.title + "\nDescription: " + event.description + "\nID: " + event.id + "\nColor: " + event.color);
        }, 
        []
    )
   
    function eventPropGetter(event) {
        var style = {
            backgroundColor: event.color,
            opacity: 0.8,
            color: 'black',
        };
        return {
            style: style
        };
    }
    
    function handleAddEventsFromDB() {
        for (const property in tasks) {
            console.log(`${property}: ${tasks[property]}`);
        }
        /*tasks.forEach(task => {
            const title = task.desc;
            const start = task.endDate;
            const end = task.startDate;
            setAllEvents( (allEvents) => ( [...allEvents, {title: title, start: start, end: end, color: "#c6e1a5"}]));
        });*/
    }

    function handleAddAllEvents(events){ //adds to local calendar from array returned from Google
        setAllEvents([]);
        events.forEach(event => {
            const title = event.summary;
            const start = new Date(event.start.dateTime);
            const end = new Date(event.end.dateTime);
            const desc = event.description;
            const gapiId = event.id; //ID assigned by google
            let color = ""
            if(!event.colorId){
                color = "#c6e1a5";
            } else {
                switch (event.colorId) {
                    case "1":
                        color = "#7986cb";
                        break;
                    case "2":
                        color = "#33b679";
                        break;
                    case "3":
                        color = "#8e24aa";
                        break;
                    case "4":
                        color = "#e67c73";
                        break;
                    case "5":
                        color = "#f6c026";
                        break;
                    case "6":
                        color = "#f5511d";
                        break;
                    case "7":
                        color = "#039be5";
                        break;
                    case "8":
                        color = "#616161";
                        break;
                    case "9":
                        color = "#3f51b5";
                        break;
                    case "10":
                        color = "#0b8043";
                        break;
                    case "11":
                        color = "#d60000";
                        break;
                    default:
                        color = "#c6e1a5";
                }
            }
            setAllEvents( (allEvents) => ( [...allEvents, {title: title, start: start, end: end, description: desc, id: gapiId, color: color}]));
        })
    }
    
    function getEvents() { //gets array of events from calendar api
        console.log("Getting array of events");
        let eventsFromGoogle = [];

        function initiate() {
            gapi.client.request({
                path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                method: "GET",                
                headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${ImportedAccessToken}`                
                },
            }).then(
                (response) => {
                eventsFromGoogle = response.result.items;
                console.log(eventsFromGoogle);
                handleAddAllEvents(eventsFromGoogle); //add to local calendar
                return eventsFromGoogle;
            },
            function (err) {
                console.log(err);
                return [false, err];
            }
            )
        } gapi.load("client", initiate);
    }

    function handleAddCalendarEvent() { //creates an event 
        
        console.log("Creating calendar event");
        const title = newEvent.title;
        const start = newEvent.start;
        const end = newEvent.end;
        
        const event = {
            'summary': title,
            'description': "Eventually add a way to customize this.",
            'start': {
                'dateTime': start.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }

        function initiate() {
            gapi.client.request({
                path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events`,
                method: "POST",
                body: event,
                headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${ImportedAccessToken}`               
                },
            }).then(
                (response) => {
                setAllEvents( (allEvents) => ( [...allEvents, {title: title, start: start, end: end, id: response.result.id}]));
                return [true, response];
            },
            function (err) {
                console.log(err);
                return [false, err];
            }
            );
        } gapi.load("client", initiate);        
    }

    function handleDeleteCalendarEvent() {  //deletes an event 
        setAllEvents(allEvents.filter(dontRemove => dontRemove !== selected));
        function initiate(){
            gapi.client.request({ //deletes "selected" item
                path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${selected.id}`,
                method: "DELETE",
                
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${ImportedAccessToken}`
                },
            }).then(
                (response) => {
                console.log("Event " + selected.id + " deleted successfully.")
                return [true, response];
            },
            function (err) {
                console.log(err);
                return [false, err];
            }
            );
        } gapi.load("client", initiate);        
    }

    function updateItem(id, title, start, end, desc) { //updates an event locally, feels janky but im not sure...
        var index = allEvents.findIndex(x=> x.id === selected.id);
        if (index === -1) {
            console.log("Could not find event.");
        } else {
            let temp = allEvents.slice();
            temp[index] = {title: title, start: start, end: end, description: desc};
            setAllEvents(temp);
        }
    }
    
    function handleUpdateCalendarEvent() {  //updates an event
        const title = newEvent.title;
        const start = newEvent.start;
        const end = newEvent.end;
        const desc = newEvent.description;
        
        const event = {
            'summary': title,
            'description': desc,
            'start': {
                'dateTime': start.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
                'dateTime': end.toISOString(),
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }

        updateItem(selected.id, title, start, end, desc);

        function initiate(){
            gapi.client.request({ //deletes "selected" item
                path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${selected.id}`,
                method: "PUT",
                body: event,
                headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${ImportedAccessToken}`
                
                },
            }).then(
                (response) => {
                console.log("Event " + selected.id + " updated successfully.")
                return [true, response];
            },
            function (err) {
                console.log(err);
                return [false, err];
            }
            );
        } gapi.load("client", initiate);        
    }
    
    if(sign){
        return (
            <>
            <Grid container direction={"row"}>
                <Box sx={{width: `${boxWidth}%`}}>
                    <div>
                        <h1>
                            <Button sx={{marginTop: "3%", marginLeft: "5%"}} variant="contained" endIcon={<AddTaskIcon/>} onClick={handleOpenModal}>New Task</Button>
                            <NewTaskModal open={nTask} handleClose={handleClose} db={db} user={user}/>
                            
                            <Button 
                                sx={{marginTop: "3%", marginLeft: "5%"}} 
                                variant="contained" endIcon={<AddTaskIcon/>} 
                                onClick={() => setShowList(!showList)}>
                                {showList ? "Hide" : "Show"} list
                            </Button>
                            
                        </h1>
                    </div>
                    <div>
                        <Calendar 
                            localizer={localizer}
                            events={allEvents}
                            eventPropGetter={eventPropGetter}
                            onSelectEvent={handleSelectEvent}
                            onSelectSlot={handleOpenModal}
                            selected={selected}
                            selectable
                            startAccessor="start"
                            endAccessor="end" 
                            style={{ height: 500, margin: "50px" }} 
                        />
                    </div>
                </Box>
                <Box sx={{width: `${100-boxWidth}%`}}>
                    <div className="Calendar">
                        {showList ? <TableGraph data={data}/>  : null} 
                    </div>
                </Box>
            </Grid>
            </>
        );
    }
    else{
        return <Navigate replace to="/"/>
    }
} export default Calendar1;