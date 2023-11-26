import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper } from "@mui/material";
import data from "./example.json";

function Home () {
    return(
        <>
        Home sweet home
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Task</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Priority</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {data.map((dataObj, index) => {
                    return (
                        <TableRow>
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
        </>
    );
}

export default Home;