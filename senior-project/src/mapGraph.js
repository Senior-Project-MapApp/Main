import React from "react";
import { TableContainer, TableBody, TableCell, TableRow,TableHead, Typography, Table, Paper } from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import CheckIcon from '@mui/icons-material/Check';

function MapGraph ({data}) {

    var arr = data.data;
    var larr = data.locs;

    arr.sort((a, b) => a.location < b.location ? 1 : -1);
    arr.sort((a, b) => b.priority - a.priority);
    arr.sort((a, b) => a.status - b.status);

    return(
        <>
        {
        larr.map((obj) => {
            return(<ul key={obj.index} >
            <TableContainer  sx={{marginTop: "2%", maxHeight: "50"}} component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow sx={{"& th": {color: "#1b5e20", backgroundColor: "#c5e1a5"}}}>
                            <TableCell align="center"><Typography>{obj.location}</Typography></TableCell>
                            <TableCell align="center"><Typography>Task</Typography></TableCell>
                            <TableCell align="center"><Typography>Task Name</Typography></TableCell>
                            <TableCell align="center"><Typography>Priority</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                {arr.map((dataObj) => {
                        return(
                            <TableBody key={dataObj.task} >
                                <TableRow sx={dataObj.status ? {background: "#dcedc8"}:{}}>  
                                    { dataObj.location === obj.location ? <TableCell align="center">{dataObj.status ? <CheckIcon/> : <> </> }</TableCell> : <></>}
                                    { dataObj.location === obj.location ?  <TableCell align="center">{dataObj.task}</TableCell> : <></> }
                                    { dataObj.location === obj.location ?  <TableCell align="center">{dataObj.name}</TableCell> : <></> }
                                    { dataObj.location === obj.location ?  <TableCell sx={dataObj.priority && !dataObj.status ? {background: "#ef9a9a"}:{}} align="center">{dataObj.priority  <  1 ? <HorizontalRuleIcon/> : <DensityMediumIcon/>  }</TableCell> : <></> }
                                </TableRow>
                            </TableBody> 
                            )}
                )}
                </Table>
            </TableContainer>
            </ul>
        )})}
        </>
    );
}

export default MapGraph;