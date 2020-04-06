import React from "react";
import {Typography} from "@material-ui/core";
import {useTheme} from "@material-ui/core/styles";

const Text = props => (
    <Typography
        variant='h6'
        style={{
            display: "inline",
            fontFamily: "'Bree Serif', serif",
            color: props.color
        }}>
        {props.children}
    </Typography>
);

export const Logo = props => {
    const theme = useTheme();
    return (
        <div>
            <Text color={theme.palette.info.main}>bez</Text>
            <Text color={theme.palette.secondary.main}>papierka.pl</Text>
        </div>
    )
};