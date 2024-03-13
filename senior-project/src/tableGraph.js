import React from "react";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper, Typography, } from "@mui/material";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

function TableGraph ({data}) {

    let arr = Object.entries(data);
    console.log(arr);

    /*arr.sort((a, b) => b.priority - a.priority);
    arr.sort((a, b) => a.status - b.status);*/

    return(
        <TableContainer  sx={{marginTop: "2%", maxHeight: "50"}} component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow sx={{"& th": {color: "#1b5e20", backgroundColor: "#c5e1a5"}}}>
                                <TableCell align="center"><Typography>Task Name</Typography></TableCell>
                                <TableCell align="left"><Typography>Description</Typography></TableCell>
                                <TableCell align="center"><Typography>Location</Typography></TableCell>
                                <TableCell align="center"><Typography>Start Date</Typography></TableCell>
                                <TableCell align="center"><Typography>End Date</Typography></TableCell>
                                {/*<TableCell align="center"><Typography>Priority</Typography></TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {arr.map((dataObj) => {
                            return (
                                <TableRow key={dataObj[0]}>
                                    <TableCell align="center">{dataObj[0]}</TableCell> 
                                    <TableCell align="left">{dataObj[1].desc}</TableCell>
                                    <TableCell align="center">{dataObj[1].loc}</TableCell>
                                    <TableCell align="center">{dataObj[1].startDate.substring(0, 15)}</TableCell>
                                    <TableCell align="center">{dataObj[1].endDate.substring(0, 15)}</TableCell>
                                    {/*<TableCell sx={dataObj.priority && !dataObj.status ? {background: "#ef9a9a"}:{}} align="center">{dataObj.priority  <  1 ? <HorizontalRuleIcon/> : <DensityMediumIcon/>  }</TableCell> */}
                                </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
    );
}

export default TableGraph;