import React, {Fragment} from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

export const Footer = props => {
    return (
        <Fragment>
            <Paper variant="outlined">
                <Typography
                    variant="overline"
                    style={{
                        display: "block",
                        textAlign: 'center',
                    }}>
                    (C) Copyright 2020
                </Typography>
            </Paper>
        </Fragment>
    );
};