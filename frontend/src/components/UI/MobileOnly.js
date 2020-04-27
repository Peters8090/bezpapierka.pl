import React from 'react';

import PropTypes from "prop-types";
import {useMediaQuery, useTheme} from "@material-ui/core";

export const MobileOnly = props => {
    const theme = useTheme();

    return (
        <React.Fragment>
            {useMediaQuery(theme.breakpoints.down('sm')) && props.children}
        </React.Fragment>
    );
};

MobileOnly.propTypes = {
    children: PropTypes.node.isRequired
};