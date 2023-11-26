import React from "react";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper, } from "@mui/material";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

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
                                <TableRow sx={dataObj.status ? {background: "lightgreen"}:{}}>
                                    <TableCell align="center">{dataObj.task}</TableCell>
                                    <TableCell align="center">{dataObj.desc}</TableCell> 
                                    <TableCell align="center">{dataObj.priority  < 2 ? <DensityMediumIcon/> : <HorizontalRuleIcon/>}</TableCell> 
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