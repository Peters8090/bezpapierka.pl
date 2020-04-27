import {CircularProgress} from "@material-ui/core";
import React from "react";

export const LoadingScreen = _ => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
    }}>
        <CircularProgress style={{color: 'black'}}/>
    </div>
);