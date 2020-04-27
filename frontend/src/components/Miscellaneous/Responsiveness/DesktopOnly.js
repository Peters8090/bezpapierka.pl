import React from 'react';

import PropTypes from 'prop-types';
import {useMediaQuery, useTheme} from "@material-ui/core";

export const DesktopOnly = props => {
    const theme = useTheme();

    return (
        <React.Fragment>
            {useMediaQuery(theme.breakpoints.up('md')) && props.children}
        </React.Fragment>
    );
};

DesktopOnly.propTypes = {
    children: PropTypes.node.isRequired
};