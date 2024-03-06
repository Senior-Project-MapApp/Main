import React from "react";
import { Grid, Paper, Button } from "@mui/material";
import logo from "./images/logo.png"

function SignIn({HandleSignIn}){
    return(
        <Grid container direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{margin: "auto"}}>
            <Paper sx={{width: "30%", margin: "20%"}} elevation={24}>
                <Grid container rowGap={3} direction={"column"} justifyContent={"center"} alignItems={"center"} sx={{marginTop: "5%", marginBottom: "5%"}}>
                    <img src={logo} alt="Logo" width={100}/>
                    <Button variant="contained" onClick={HandleSignIn}>Sign In with Google</Button>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default SignIn;
