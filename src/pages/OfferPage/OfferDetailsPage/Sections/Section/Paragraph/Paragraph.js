import {Box, Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import React from 'react';
import PropTypes from 'prop-types';


export const Paragraph = props => {
    return (
        <>
            <Typography variant='body2' align='justify'>
                {props.body}
            </Typography>
        </>
    );
};

Paragraph.propTypes = {
    body: PropTypes.string.isRequired,
};