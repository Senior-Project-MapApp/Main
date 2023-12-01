import React from "react";
import { TableContainer, TableBody, TableCell, TableRow,TableHead, Typography, Table, Paper } from "@mui/material";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

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
            return(<>
            <TableContainer sx={{marginTop: "2%", maxHeight: "50"}} component={Paper}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow sx={{"& th": {color: "#1b5e20", backgroundColor: "#c5e1a5"}}}>
                            <TableCell align="center"><Typography>Location</Typography></TableCell>
                            <TableCell align="center"><Typography>Description</Typography></TableCell>
                            <TableCell align="center"><Typography>Priority</Typography></TableCell>
                            <TableCell align="center"><Typography>Status</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                {arr.map((dataObj) => {
                        return(
                            <TableBody>
                                <TableRow sx={dataObj.status ? {background: "#dcedc8"}:{}}>  
                                    { dataObj.location === obj ?  <TableCell align="center">{obj}</TableCell> : <></> }
                                    { dataObj.location === obj ?  <TableCell align="center">{dataObj.desc}</TableCell> : <></> }
                                    { dataObj.location === obj ?  <TableCell sx={dataObj.priority && !dataObj.status ? {background: "#ef9a9a"}:{}} align="center">{dataObj.priority  <  1 ? <HorizontalRuleIcon/> : <DensityMediumIcon/>  }</TableCell> : <></> }
                                    { dataObj.location === obj ?  <TableCell align="center">{dataObj.status}</TableCell> : <></> }
                                </TableRow>
                            </TableBody> 
                            )}
                )}
                </Table>
            </TableContainer>
            </>
        )})}
        </>
    );
}

export default MapGraph;