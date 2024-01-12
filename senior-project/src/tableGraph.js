import React from "react";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper, Typography, } from "@mui/material";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

function TableGraph ({data}) {

    var arr = data.data;

    arr.sort((a, b) => b.priority - a.priority);
    arr.sort((a, b) => a.status - b.status);

    return(
        <TableContainer  sx={{marginTop: "2%", maxHeight: "50"}} component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{"& th": {color: "#1b5e20", backgroundColor: "#c5e1a5"}}}>
                                <TableCell align="center"><Typography>Task</Typography></TableCell>
                                <TableCell align="center"><Typography>Task Name</Typography></TableCell>
                                <TableCell align="center"><Typography>Priority</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {arr.map((dataObj) => {
                            return (
                                <TableRow key={dataObj.task} sx={dataObj.status ? {background: "#dcedc8"}:{}}>
                                    <TableCell align="center">{dataObj.task}</TableCell>
                                    <TableCell align="center">{dataObj.name}</TableCell> 
                                    <TableCell sx={dataObj.priority && !dataObj.status ? {background: "#ef9a9a"}:{}} align="center">{dataObj.priority  <  1 ? <HorizontalRuleIcon/> : <DensityMediumIcon/>  }</TableCell> 
                                </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
    );
}

export default TableGraph;