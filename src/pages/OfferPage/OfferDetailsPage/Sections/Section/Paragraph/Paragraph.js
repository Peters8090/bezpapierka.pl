import React from 'react';

import PropTypes from 'prop-types';
import {Typography} from "@material-ui/core";


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