import React from 'react';
import { useState, useCallback} from "react";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { gapi } from "gapi-script";
import { Grid, Box, Button} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TableGraph from "./tableGraph";
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Navigate } from "react-router-dom";
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

function Calendar1 ({user, db, sign, task, removeTask}) {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" , description: "", id: "", color: "#c6e1a5", location: ""});
    const [allEvents, setAllEvents] = useState([]);
    const [selected, setSelected] = useState();
    const [nTask, setNTask] = useState(false);
    const [showList, setShowList] = useState(false);
    const [boxWidth, setBoxWidth] = useState(100);
    const [update, setUpdate] = useState(false);
    
    let dbTasks = Object.entries(task);
    const ImportedAccessToken = accessToken;
    
    React.useEffect(() => { // shows or hides list on the right of screen
        setAllEvents([]);
        getEvents(); // gets all calendar events from Google and now the DB as well
        if (showList === false) { //adjusts box width 
            setBoxWidth(100);
        } else {
            setBoxWidth(70);
        }
    }, [showList, nTask]);

    const handleOpenModal = () => {
        setNTask(true);
    };
  
    const handleClose = () => {
        setNTask(false);
    };
  
    const handleSelectEvent = useCallback(
        (event) => {setSelected(event);
                    window.alert("Title: " + event.title + "\nDescription: " + event.description + "\nID: " + event.id + "\nColor: " + event.color + "\nLocation: " + event.location);
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
    
    function handleAddEventsFromDB(dbTasks) {
        for (var i = 0; i < dbTasks.length; i++) {
            const title = dbTasks[i][0];
            const desc = dbTasks[i][1].desc;
            const location = dbTasks[i][1].loc;
            const start = new Date(dbTasks[i][1].startDate);
            const end = new Date(dbTasks[i][1].endDate);
            setAllEvents( (allEvents) => ( [...allEvents, {title: title, start: start, end: end, description: desc, color: "#c6e1a5", location: location}]));
        }
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
    
    function getEvents() { //gets array of events from calendar api and db
        console.log("Getting array of events");
        const calendarID = user.email;
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
                handleAddEventsFromDB(dbTasks); // adds to local calendar from db
                return eventsFromGoogle;
            },
            function (err) {
                handleAddEventsFromDB(dbTasks); // adds to local calendar from db
                console.log(err);
                return [false, err];
            }
            )
        } gapi.load("client", initiate);
    }

    function handleAddCalendarEvent(title, start, end, desc) { //creates an event         
        console.log("Creating calendar event");
        const calendarID = user.email;
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
        const calendarID = user.email;
        function initiate(){
            gapi.client.request({ 
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
        const calendarID = user.email;

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
                        <Button sx={{marginTop: "3%", marginLeft: "83%"}} variant="contained" endIcon={<AddTaskIcon/>} onClick={handleOpenModal}>New Task</Button>
                        <NewTaskModal open={nTask} handleClose={handleClose} db={db} user={user}/>
                        <Button 
                            sx={{marginTop: "3%", marginLeft: "83%"}} 
                            variant="contained" endIcon={showList ? <VisibilityOffIcon/> : <VisibilityIcon/>} 
                            onClick={() => setShowList(!showList)}>
                            {showList ? "Hide" : "Show"} list
                        </Button>                        
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
                    <div>
                        {showList ? <TableGraph data={task} removeTask={removeTask} user={user} db={db} />  : null} 
                    </div>
                </Box>
            </Grid>
            </>
        );
    } else {
        return <Navigate replace to="/"/>
    }
} export default Calendar1;