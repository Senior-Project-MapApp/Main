import React from "react";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper, Typography, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function TableGraph ({data, removeTask, user, db}) {

    let arr = Object.entries(data);
    console.log(arr);

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
                                <TableCell align="center"><Typography></Typography></TableCell>
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
                                    <TableCell align="center"><IconButton onClick={() => removeTask(user, db, dataObj[0])}><DeleteIcon/></IconButton></TableCell>
                                </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
    );
}

export default TableGraph;