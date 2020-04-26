import React from 'react';

import {Paper, Typography, Box} from "@material-ui/core";


export const Footer = _ => {
    return (
        <footer>
            <Paper variant="outlined">
                <Box p={1}>
                    <Typography align='center' style={{textTransform: 'uppercase'}}>
                        (C) Copyright 2020
                    </Typography>
                </Box>
            </Paper>
        </footer>
    );
};