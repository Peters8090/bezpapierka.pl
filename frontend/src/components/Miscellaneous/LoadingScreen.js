import {CircularProgress} from "@material-ui/core";
import React from "react";
/** @jsx jsx */
import {jsx} from '@emotion/core';

export const LoadingScreen = _ => (
    <div css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
    }}>
        <CircularProgress css={{color: 'black'}}/>
    </div>
);