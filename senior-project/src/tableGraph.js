import React from "react";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper, } from "@mui/material";

function TableGraph ({data}) {

    data.sort((a, b) => a.priority - b.priority);
    data.sort((a, b) => a.status - b.status);

    return(
        <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Task</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">Priority</TableCell>
                                <TableCell align="center">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((dataObj) => {
                            return (
                                <TableRow >
                                    <TableCell align="center">{dataObj.task}</TableCell>
                                    <TableCell align="center">{dataObj.desc}</TableCell> 
                                    <TableCell align="center">{dataObj.priority}</TableCell> 
                                    <TableCell align="center">{dataObj.status}</TableCell>
                                </TableRow>
                            );
                        })}
                        </TableBody>
                    </Table>
                </TableContainer>
    );
}

export default TableGraph;