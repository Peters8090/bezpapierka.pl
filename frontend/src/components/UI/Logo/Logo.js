import React from "react";

import {Typography, Box, useTheme} from "@material-ui/core";

export const Logo = _ => {
    const theme = useTheme();

    return (
        <Box display='flex'>
            <Text text='bez' color={theme.palette.logo1.main}/>
            <Text text='papierka.pl' color={theme.palette.logo2.main}/>
        </Box>
    )
};

const Text = props => (
    <Typography variant='h6'
                style={{
                    color: props.color,
                    fontFamily: "'Bree Serif', serif",
                }}>
        {props.text}
    </Typography>
);